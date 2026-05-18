import { useState, useEffect, useRef, useCallback } from "react"

const MAX_CANVAS_W = 900

export default function Canvas({
  templateImage,
  placeholders,
  selectedId,
  onSelectId,
  onPositionChange,
  onResize,
  onPropertyChange,
  onCanvasSizeChange,
  onAutoZoom,
  zoom = 1,
}) {
  const [canvasSize, setCanvasSize] = useState({ w: 794, h: 1123 })
  const containerRef = useRef(null)

  useEffect(() => {
    if (!templateImage) return
    const img = new Image()
    img.onload = () => {
      const scale = Math.min(1, MAX_CANVAS_W / img.naturalWidth)
      const newSize = {
        w: Math.round(img.naturalWidth * scale),
        h: Math.round(img.naturalHeight * scale),
      }
      setCanvasSize(newSize)
      onCanvasSizeChange?.(newSize)
    }
    img.src = templateImage
  }, [templateImage, onCanvasSizeChange])

  // Auto-zoom to fit the container when it's narrower than the canvas
  useEffect(() => {
    if (!containerRef.current) return
    const el = containerRef.current
    const updateZoom = () => {
      const containerW = el.clientWidth
      if (containerW > 0 && containerW < canvasSize.w + 80) {
        const autoZoom = Math.max(0.3, parseFloat(((containerW - 80) / canvasSize.w).toFixed(2)))
        onAutoZoom?.(autoZoom)
      }
    }
    updateZoom()
    const ro = new ResizeObserver(updateZoom)
    ro.observe(el)
    return () => ro.disconnect()
  }, [canvasSize.w, onAutoZoom])

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 flex items-start justify-center p-10"
      onClick={() => onSelectId(null)}
    >
      {/* Dot-grid background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle, rgba(57,255,20,0.12) 1px, transparent 1px)`,
          backgroundSize: "24px 24px",
        }}
      />

      {/* Document canvas */}
      <div
        className="relative shadow-2xl shrink-0 overflow-hidden"
        style={{
          width: canvasSize.w,
          height: canvasSize.h,
          background: templateImage ? "transparent" : "#ffffff",
          border: "1px solid rgba(26,26,26,0.12)",
          transform: `scale(${zoom})`,
          transformOrigin: "top center",
          transition: "transform 0.2s ease-out",
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {templateImage ? (
          <img
            src={templateImage}
            alt="Template"
            draggable={false}
            className="absolute inset-0 w-full h-full object-fill select-none pointer-events-none"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center opacity-20">
              <svg width="48" height="48" viewBox="0 0 48 48" fill="none" className="mx-auto mb-3">
                <rect x="8" y="8" width="32" height="32" rx="2" stroke="#1a1a1a" strokeWidth="1.5" />
                <path d="M24 18v12M18 24h12" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
              <p className="text-xs font-mono tracking-widest text-foreground/40 uppercase">No template loaded</p>
              <p className="text-[10px] font-mono text-foreground/25 mt-1">Go back to upload one</p>
            </div>
          </div>
        )}

        {/* Corner coordinate markers */}
        <span className="absolute top-1 left-1 font-mono text-[7px] text-[#39FF14]/30">[0,0]</span>
        <span className="absolute top-1 right-1 font-mono text-[7px] text-[#39FF14]/30">[{canvasSize.w},0]</span>
        <span className="absolute bottom-1 left-1 font-mono text-[7px] text-[#39FF14]/30">[0,{canvasSize.h}]</span>
        <span className="absolute bottom-1 right-1 font-mono text-[7px] text-[#39FF14]/30">[{canvasSize.w},{canvasSize.h}]</span>

        {placeholders.map((ph) => (
          <DraggablePlaceholder
            key={ph.id}
            ph={ph}
            isSelected={selectedId === ph.id}
            onSelect={() => onSelectId(ph.id)}
            onPositionChange={onPositionChange}
            onResize={onResize}
            onPropertyChange={onPropertyChange}
            canvasSize={canvasSize}
            zoom={zoom}
          />
        ))}
      </div>
    </div>
  )
}

// ─── Draggable + Resizable + Inline-Editable Placeholder ────────────────────

function DraggablePlaceholder({
  ph,
  isSelected,
  onSelect,
  onPositionChange,
  onResize,
  onPropertyChange,
  canvasSize,
  zoom,
}) {
  const [isEditing, setIsEditing] = useState(false)
  const [isResizing, setIsResizing] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [editValue, setEditValue] = useState(ph.key)
  const inputRef = useRef(null)
  const resizeState = useRef(null)
  const dragState = useRef(null)

  // Keep edit value in sync with external key changes (e.g. PropertiesPanel)
  useEffect(() => {
    if (!isEditing) setEditValue(ph.key)
  }, [ph.key, isEditing])

  // Auto-focus & select text when editing starts
  useEffect(() => {
    if (isEditing) {
      requestAnimationFrame(() => {
        inputRef.current?.focus()
        inputRef.current?.select()
      })
    }
  }, [isEditing])

  const commitEdit = useCallback(() => {
    const trimmed = editValue.trim()
    if (trimmed && trimmed !== ph.key) {
      onPropertyChange(ph.id, "key", trimmed)
    }
    setIsEditing(false)
  }, [editValue, ph.key, ph.id, onPropertyChange])

  // ── Corner resize via raw pointer events ─────────────────────────────────
  const handleResizePointerDown = useCallback((corner, e) => {
    e.stopPropagation()   // stop canvas click
    e.preventDefault()    // prevent text selection

    // Capture pointer so move/up fire even if cursor leaves the handle
    e.currentTarget.setPointerCapture(e.pointerId)

    setIsResizing(true)   // disable framer-motion drag while we resize

    resizeState.current = {
      corner,
      startX: e.clientX,
      startY: e.clientY,
      startW: ph.width,
      startH: ph.height,
      startPx: ph.x,
      startPy: ph.y,
    }

    const onPointerMove = (ev) => {
      const r = resizeState.current
      if (!r) return

      const dx = (ev.clientX - r.startX) / zoom
      const dy = (ev.clientY - r.startY) / zoom

      let newX = r.startPx
      let newY = r.startPy
      let newW = r.startW
      let newH = r.startH

      switch (r.corner) {
        case "br":
          newW = Math.max(60, r.startW + dx)
          newH = Math.max(24, r.startH + dy)
          break
        case "bl":
          newW = Math.max(60, r.startW - dx)
          newX = r.startPx + (r.startW - newW)
          newH = Math.max(24, r.startH + dy)
          break
        case "tr":
          newW = Math.max(60, r.startW + dx)
          newH = Math.max(24, r.startH - dy)
          newY = r.startPy + (r.startH - newH)
          break
        case "tl":
          newW = Math.max(60, r.startW - dx)
          newX = r.startPx + (r.startW - newW)
          newH = Math.max(24, r.startH - dy)
          newY = r.startPy + (r.startH - newH)
          break
      }

      // Clamp to canvas bounds
      newX = Math.max(0, Math.min(canvasSize.w - newW, newX))
      newY = Math.max(0, Math.min(canvasSize.h - newH, newY))

      onResize(ph.id, { x: newX, y: newY, width: newW, height: newH })
    }

    const onPointerUp = () => {
      resizeState.current = null
      setIsResizing(false)
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerup", onPointerUp)
    }

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)
  }, [ph, canvasSize, onResize, zoom])

  // ── Manual Dragging via pointer events ──────────────────────────────────
  const handleDragPointerDown = useCallback((e) => {
    if (isEditing || isResizing) return
    e.stopPropagation()
    onSelect()

    // Capture pointer
    e.currentTarget.setPointerCapture(e.pointerId)
    setIsDragging(true)

    dragState.current = {
      startX: e.clientX,
      startY: e.clientY,
      startPx: ph.x,
      startPy: ph.y,
    }

    const onPointerMove = (ev) => {
      const d = dragState.current
      if (!d) return

      const dx = (ev.clientX - d.startX) / zoom
      const dy = (ev.clientY - d.startY) / zoom

      let newX = d.startPx + dx
      let newY = d.startPy + dy

      // Clamp to bounds
      newX = Math.max(0, Math.min(canvasSize.w - ph.width, newX))
      newY = Math.max(0, Math.min(canvasSize.h - ph.height, newY))

      onPositionChange(ph.id, newX, newY)
    }

    const onPointerUp = () => {
      dragState.current = null
      setIsDragging(false)
      document.removeEventListener("pointermove", onPointerMove)
      document.removeEventListener("pointerup", onPointerUp)
    }

    document.addEventListener("pointermove", onPointerMove)
    document.addEventListener("pointerup", onPointerUp)
  }, [isEditing, isResizing, onSelect, ph, zoom, canvasSize, onPositionChange])

  const fontWeight = ph.fontWeight === "Bold" ? 700 : ph.fontWeight === "Medium" ? 500 : 400

  return (
    <div
      data-ph-id={ph.id}
      className="absolute select-none group"
      style={{
        width: ph.width,
        height: ph.height,
        left: 0,
        top: 0,
        transform: `translate(${ph.x}px, ${ph.y}px)`,
        zIndex: isSelected ? 20 : 10,
        cursor: isEditing ? "text" : isDragging ? "grabbing" : "grab",
        // Smooth transition only when NOT dragging or resizing (e.g. sidebar edits)
        transition: isDragging || isResizing ? "none" : "transform 0.2s ease-out, width 0.2s ease-out, height 0.2s ease-out",
      }}
      onPointerDown={handleDragPointerDown}
      onDoubleClick={(e) => {
        e.stopPropagation()
        onSelect()
        setIsEditing(true)
      }}
    >
      {/* Main field box */}
      <div
        className="relative w-full h-full flex items-center px-2 overflow-hidden"
        style={{
          border: isEditing
            ? "1.5px solid #39FF14"
            : isSelected
            ? "1.5px solid #39FF14"
            : "1.5px dashed rgba(57,255,20,0.45)",
          background: isEditing
            ? "rgba(57,255,20,0.12)"
            : isSelected
            ? "rgba(57,255,20,0.08)"
            : "rgba(57,255,20,0.04)",
          backdropFilter: "blur(1px)",
          transition: "all 0.2s ease-out",
        }}
      >
        {isEditing ? (
          /* ── Inline rename input ─────────────────────────────────── */
          <input
            ref={inputRef}
            value={editValue}
            onChange={(e) => setEditValue(e.target.value)}
            onBlur={commitEdit}
            onKeyDown={(e) => {
              if (e.key === "Enter") commitEdit()
              if (e.key === "Escape") { setEditValue(ph.key); setIsEditing(false) }
            }}
            onClick={(e) => e.stopPropagation()}
            onPointerDown={(e) => e.stopPropagation()}
            className="w-full bg-transparent border-none outline-none font-mono"
            style={{
              fontSize: ph.fontSize,
              fontFamily: `${ph.fontFamily}, Inter, sans-serif`,
              fontWeight,
              textAlign: ph.align,
              color: "#39FF14",
              caretColor: "#39FF14",
              letterSpacing: "0.02em",
              fontStyle: ph.fontStyle,
            }}
          />
        ) : (
          /* ── Placeholder key label ───────────────────────────────── */
          <span
            className="font-mono leading-none pointer-events-none w-full truncate"
            style={{
              fontSize: ph.fontSize,
              fontFamily: ph.fontFamily,
              fontWeight,
              textAlign: ph.align,
              color: isSelected ? "#39FF14" : "rgba(57,255,20,0.75)",
              textShadow: isSelected ? "0 0 8px rgba(57,255,20,0.4)" : "none",
              fontStyle: ph.fontStyle,
            }}
          >
            {`{{${ph.key}}}`}
          </span>
        )}
      </div>

      {/* ── Resize corner handles (only when selected) ─────────────────── */}
      {isSelected && (
        <>
          <Handle pos="tl" onPointerDown={(e) => handleResizePointerDown("tl", e)} />
          <Handle pos="tr" onPointerDown={(e) => handleResizePointerDown("tr", e)} />
          <Handle pos="bl" onPointerDown={(e) => handleResizePointerDown("bl", e)} />
          <Handle pos="br" onPointerDown={(e) => handleResizePointerDown("br", e)} />
        </>
      )}

      {/* ── Coordinate + size readout ──────────────────────────────────── */}
      {isSelected && (
        <span
          className="absolute -top-5 left-0 font-mono text-[9px] whitespace-nowrap pointer-events-none"
          style={{ color: "rgba(57,255,20,0.6)" }}
        >
          [{Math.round(ph.x)}, {Math.round(ph.y)}] {Math.round(ph.width)}×{Math.round(ph.height)}
        </span>
      )}

      {/* ── Double-click hint (unselected hover) ───────────────────────── */}
      {!isSelected && (
        <span
          className="absolute -bottom-5 left-0 font-mono text-[8px] whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity"
          style={{ color: "rgba(57,255,20,0.4)" }}
        >
          dbl-click to rename
        </span>
      )}

      {/* ── Editing mode tooltip ───────────────────────────────────────── */}
      {isEditing && (
        <span
          className="absolute -bottom-5 left-0 font-mono text-[8px] whitespace-nowrap pointer-events-none"
          style={{ color: "rgba(57,255,20,0.6)" }}
        >
          Enter to confirm · Esc to cancel
        </span>
      )}
    </div>
  )
}

// ─── Corner resize handle ────────────────────────────────────────────────────

function Handle({ pos, onPointerDown }) {
  const posMap = {
    tl: { top: -5, left: -5, cursor: "nwse-resize" },
    tr: { top: -5, right: -5, cursor: "nesw-resize" },
    bl: { bottom: -5, left: -5, cursor: "nesw-resize" },
    br: { bottom: -5, right: -5, cursor: "nwse-resize" },
  }
  const { cursor, ...posStyle } = posMap[pos]

  return (
    <div
      className="absolute w-3 h-3 rounded-full bg-white border-2 border-[#39FF14] z-30"
      style={{
        ...posStyle,
        cursor,
        boxShadow: "0 0 6px rgba(57,255,20,0.6)",
      }}
      onPointerDown={onPointerDown}
    />
  )
}
