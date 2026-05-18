import { useState, useRef, useCallback, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { motion, AnimatePresence } from "framer-motion"
import * as pdfjsLib from "pdfjs-dist"

// Point pdfjs at its bundled worker
pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString()

/**
 * Render the first page of a PDF file into a high-res DataURL.
 * @param {File} file
 * @returns {Promise<{ dataUrl: string, w: number, h: number }>}
 */
async function renderPdfToImage(file) {
  const arrayBuffer = await file.arrayBuffer()
  const pdf = await pdfjsLib.getDocument({ data: arrayBuffer }).promise
  const page = await pdf.getPage(1)
  const scale = 2 // 2x for high resolution
  const viewport = page.getViewport({ scale })

  const canvas = document.createElement("canvas")
  canvas.width = viewport.width
  canvas.height = viewport.height
  const ctx = canvas.getContext("2d")

  await page.render({ canvasContext: ctx, viewport }).promise
  return {
    dataUrl: canvas.toDataURL("image/png"),
    w: Math.round(viewport.width / scale),
    h: Math.round(viewport.height / scale),
  }
}

const LOG_LINES = [
  "[SYS] BLUEPRINT_SCANNER v2.1 — READY",
  "[OK]  INGESTION NODE ACTIVE",
  "[INFO] AWAITING TEMPLATE INPUT...",
  "[INFO] ACCEPTED FORMATS: .PNG .JPG .PDF",
  "[OK]  OCR ENGINE STANDBY",
  "[OK]  ANCHOR DETECTION MODULE ONLINE",
  "[INFO] MEMORY ALLOCATED: 512MB",
  "[OK]  PIXEL INTEGRITY UNIT WARM",
]

const SCAN_LOGS = [
  "[OK]  FILE SIGNATURE VERIFIED",
  "[INFO] EXTRACTING PIXEL MATRIX...",
  "[INFO] RESOLUTION MAPPING...",
  "[OK]  COLOR DEPTH ANALYSIS COMPLETE",
  "[INFO] ANCHOR POINT DETECTION...",
  "[OK]  3 ANCHOR ZONES IDENTIFIED",
  "[INFO] ENCODING TO BLUEPRINT FORMAT...",
  "[OK]  SYSTEM READY — LAUNCHING WORKSPACE",
]

export default function Onboarding() {
  const navigate = useNavigate()
  const fileInputRef = useRef(null)
  const [phase, setPhase] = useState("idle") // idle | scanning | done
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const [isDragOver, setIsDragOver] = useState(false)
  const [logLines, setLogLines] = useState(LOG_LINES)
  const [scanProgress, setScanProgress] = useState(0)
  const [fileMeta, setFileMeta] = useState(null)

  const processFile = useCallback((f) => {
    if (!f) return
    const isPdf = f.type === "application/pdf" || f.name.toLowerCase().endsWith(".pdf")
    const isImage = f.type.startsWith("image/")
    if (!isPdf && !isImage) return

    setFile(f)

    if (isPdf) {
      renderPdfToImage(f)
        .then(({ dataUrl, w, h }) => {
          setFileMeta({
            name: f.name,
            ext: "PDF",
            size: (f.size / 1024).toFixed(1) + " KB",
            w,
            h,
          })
          setPreview(dataUrl)
          setPhase("scanning")
        })
        .catch(() => {
          // Silent fail — could show an error state here in the future
        })
    } else {
      const reader = new FileReader()
      reader.onload = (e) => {
        const img = new Image()
        img.onload = () => {
          setFileMeta({
            name: f.name,
            ext: f.name.split(".").pop().toUpperCase(),
            size: (f.size / 1024).toFixed(1) + " KB",
            w: img.naturalWidth,
            h: img.naturalHeight,
          })
          setPreview(e.target.result)
          setPhase("scanning")
        }
        img.src = e.target.result
      }
      reader.readAsDataURL(f)
    }
  }, [])

  // Scan phase: progress bar + log animation
  useEffect(() => {
    if (phase !== "scanning") return

    setLogLines([])
    setScanProgress(0)

    let lineIdx = 0
    let progress = 0

    const logInterval = setInterval(() => {
      if (lineIdx < SCAN_LOGS.length) {
        setLogLines((prev) => [...prev, SCAN_LOGS[lineIdx]])
        lineIdx++
      }
    }, 380)

    const progressInterval = setInterval(() => {
      progress += Math.random() * 14 + 3
      if (progress >= 100) {
        progress = 100
        setScanProgress(100)
        clearInterval(progressInterval)
        clearInterval(logInterval)
        setTimeout(() => setPhase("done"), 700)
      } else {
        setScanProgress(progress)
      }
    }, 220)

    return () => {
      clearInterval(logInterval)
      clearInterval(progressInterval)
    }
  }, [phase])

  // Auto-navigate once done
  useEffect(() => {
    if (phase !== "done") return
    const t = setTimeout(() => {
      navigate("/editor", { state: { templateImage: preview, fileName: fileMeta?.name } })
    }, 1100)
    return () => clearTimeout(t)
  }, [phase, navigate, preview, fileMeta])

  const handleDrop = (e) => {
    e.preventDefault()
    setIsDragOver(false)
    const f = e.dataTransfer.files[0]
    processFile(f)
  }

  const handleFileChange = (e) => processFile(e.target.files[0])

  return (
    <div className="relative min-h-screen w-full bg-background system-grid overflow-hidden flex flex-col items-center justify-center font-['Space_Grotesk']">

      {/* Ambient glow */}
      <div className="absolute top-1/3 left-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(57,255,20,0.05) 0%, transparent 70%)" }} />
      <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(57,255,20,0.04) 0%, transparent 70%)" }} />

      {/* Structural hairlines */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
      <div className="absolute top-0 bottom-0 left-0 w-px bg-gradient-to-b from-transparent via-[#39FF14]/10 to-transparent" />
      <div className="absolute top-0 bottom-0 right-0 w-px bg-gradient-to-b from-transparent via-[#39FF14]/10 to-transparent" />

      {/* Corner coordinate markers */}

      <span className="absolute bottom-6 left-8 hidden xs:block font-mono text-[9px] tracking-widest text-foreground/20 uppercase">SYSTEM: NOMINAL</span>
      <span className="absolute bottom-6 right-8 hidden xs:block font-mono text-[9px] tracking-widest text-foreground/20 uppercase">v2.1 — BETA</span>

      {/* Scan line (ambient) */}
      <div className="scan-line" />



      {/* Main Card */}
      <div className="relative w-full max-w-4xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1fr_1px_340px] gap-0 items-stretch">

        {/* Left: Upload zone */}
        <div className="pr-0 lg:pr-12 py-8 flex flex-col">

          {/* Section label */}
          <div className="mb-8">
            <span className="font-mono text-[9px] tracking-[0.2em] text-[#39FF14]/50 uppercase block mb-3">§ 01 — TEMPLATE INGESTION</span>
            <h1 className="font-bold text-[28px] xs:text-[36px] md:text-[56px] leading-none tracking-tight text-foreground">
              LOAD YOUR<br />
              <span style={{ color: "#39FF14" }}>BLUEPRINT.</span>
            </h1>
            <p className="text-sm text-foreground/40 mt-4 max-w-xs leading-relaxed">
              Upload a template image. The system will map anchor zones and initialize the workspace.
            </p>
          </div>

          {/* Drop zone */}
          <AnimatePresence mode="wait">
            {phase === "idle" && (
              <motion.div
                key="dropzone"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -16 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="flex-1"
              >
                <div
                  onDragOver={(e) => { e.preventDefault(); setIsDragOver(true) }}
                  onDragLeave={() => setIsDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className="relative cursor-pointer group flex flex-col items-center justify-center min-h-[280px] border transition-all duration-300"
                  style={{
                    borderColor: isDragOver ? "rgba(57,255,20,0.7)" : "rgba(26,26,26,0.15)",
                    background: isDragOver ? "rgba(57,255,20,0.04)" : "rgba(255,255,255,0.4)",
                    backdropFilter: "blur(8px)",
                  }}
                >
                  {/* Corner marks */}
                  <span className="absolute top-0 left-0 w-4 h-4 border-t border-l"
                    style={{ borderColor: isDragOver ? "#39FF14" : "rgba(26,26,26,0.2)" }} />
                  <span className="absolute top-0 right-0 w-4 h-4 border-t border-r"
                    style={{ borderColor: isDragOver ? "#39FF14" : "rgba(26,26,26,0.2)" }} />
                  <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l"
                    style={{ borderColor: isDragOver ? "#39FF14" : "rgba(26,26,26,0.2)" }} />
                  <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r"
                    style={{ borderColor: isDragOver ? "#39FF14" : "rgba(26,26,26,0.2)" }} />

                  {/* Upload icon */}
                  <motion.div
                    animate={{ y: isDragOver ? -6 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="mb-5"
                  >
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none" className="opacity-30 group-hover:opacity-60 transition-opacity">
                      <rect x="4" y="4" width="32" height="32" rx="1" stroke="#1a1a1a" strokeWidth="1" />
                      <path d="M20 26V14M14 20l6-6 6 6" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </motion.div>

                  <p className="text-[11px] font-mono tracking-[0.15em] text-foreground/40 uppercase group-hover:text-foreground/70 transition-colors">
                    {isDragOver ? "RELEASE TO LOAD" : "DROP IMAGE / CLICK TO BROWSE"}
                  </p>
                  <p className="text-[9px] font-mono tracking-widest text-foreground/25 mt-2 uppercase">PNG · JPG · WEBP · PDF</p>

                  {/* Crosshair overlay */}
                  <div className="absolute top-1/2 left-0 right-0 h-px bg-[#39FF14]/5 pointer-events-none" />
                  <div className="absolute left-1/2 top-0 bottom-0 w-px bg-[#39FF14]/5 pointer-events-none" />

                  {/* Hover glow */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                    style={{ background: "radial-gradient(circle at 50% 50%, rgba(57,255,20,0.06) 0%, transparent 70%)" }} />
                </div>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/*,.pdf,application/pdf"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </motion.div>
            )}

            {(phase === "scanning" || phase === "done") && preview && (
              <motion.div
                key="preview"
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="relative flex-1 min-h-[280px] border overflow-hidden"
                style={{ borderColor: "rgba(57,255,20,0.25)", background: "rgba(255,255,255,0.4)", backdropFilter: "blur(8px)" }}
              >
                {/* Preview image */}
                <img src={preview} alt="Template preview" className="w-full h-full object-contain p-4" />

                {/* Scan line overlay on image */}
                {phase === "scanning" && (
                  <motion.div
                    className="absolute left-0 right-0 h-[2px] pointer-events-none z-10"
                    style={{ background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.8) 50%, transparent 100%)" }}
                    animate={{ top: ["0%", "100%"] }}
                    transition={{ duration: 1.8, ease: "linear", repeat: Infinity }}
                  />
                )}

                {/* Done overlay */}
                {phase === "done" && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="absolute inset-0 flex items-center justify-center z-20"
                    style={{ background: "rgba(57,255,20,0.06)" }}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
                        <circle cx="18" cy="18" r="17" stroke="#39FF14" strokeWidth="1.2" />
                        <path d="M11 18l5 5 9-9" stroke="#39FF14" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                      <span className="font-mono text-[10px] tracking-widest text-[#39FF14] uppercase">System Ready</span>
                    </div>
                  </motion.div>
                )}

                {/* Corner marks */}
                <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#39FF14]/40" />
                <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#39FF14]/40" />
                <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#39FF14]/40" />
                <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#39FF14]/40" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Progress bar (scanning phase) */}
          <AnimatePresence>
            {(phase === "scanning" || phase === "done") && (
              <motion.div
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="mt-5"
              >
                <div className="flex justify-between mb-1.5">
                  <span className="font-mono text-[9px] tracking-widest text-foreground/40 uppercase">
                    {phase === "done" ? "Blueprint Ready" : "Scanning..."}
                  </span>
                  <span className="font-mono text-[9px] tracking-widest text-[#39FF14]">{Math.round(scanProgress)}%</span>
                </div>
                <div className="h-px w-full bg-border/15 relative overflow-hidden">
                  <motion.div
                    className="absolute left-0 top-0 bottom-0"
                    style={{ background: "linear-gradient(90deg, rgba(57,255,20,0.5), #39FF14)" }}
                    animate={{ width: `${scanProgress}%` }}
                    transition={{ duration: 0.2 }}
                  />
                  {phase === "scanning" && (
                    <motion.div
                      className="absolute top-0 bottom-0 w-12"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.6), transparent)" }}
                      animate={{ left: [`${scanProgress - 10}%`, `${scanProgress + 5}%`] }}
                      transition={{ duration: 0.4, repeat: Infinity, ease: "easeInOut" }}
                    />
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Mobile-only compact status strip (lg:hidden) */}
          {fileMeta && (
            <div className="lg:hidden mt-4 border border-border/10 p-3 flex items-center justify-between gap-3"
              style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
              <span className="font-mono text-[9px] tracking-widest text-foreground/40 uppercase truncate flex-1 min-w-0">
                {fileMeta.name}
              </span>
              <span className={`font-mono text-[9px] tracking-widest uppercase shrink-0 ${
                phase === "done" ? "text-[#39FF14]" : "text-foreground/40"
              }`}>
                {phase === "scanning" ? "SCANNING..." : phase === "done" ? "READY" : "—"}
              </span>
            </div>
          )}
        </div>

        {/* Divider */}
        <div className="hidden lg:block"
          style={{ width: 1, background: "linear-gradient(180deg, transparent 0%, rgba(57,255,20,0.15) 20%, rgba(57,255,20,0.15) 80%, transparent 100%)" }}
        />

        {/* Right: HUD Panel */}
        <div className="hidden lg:flex flex-col pl-10 py-8 gap-6">

          {/* File metadata */}
          <div className="border border-border/10 p-4 relative"
            style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#39FF14]/30" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#39FF14]/30" />
            <p className="font-mono text-[9px] tracking-[0.2em] text-[#39FF14]/50 uppercase mb-4">FILE METADATA</p>
            <div className="space-y-2.5">
              {[
                ["FORMAT", fileMeta?.ext ?? "—"],
                ["FILE", fileMeta?.name ?? "AWAITING INPUT"],
                ["SIZE", fileMeta?.size ?? "—"],
                ["RESOLUTION", fileMeta ? `${fileMeta.w} × ${fileMeta.h}` : "—"],
                ["INTEGRITY", phase === "idle" ? "—" : phase === "scanning" ? "CHECKING..." : "100%"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center border-b border-border/8 pb-2">
                  <span className="font-mono text-[9px] tracking-widest text-foreground/30 uppercase">{k}</span>
                  <span className="font-mono text-[10px] font-medium" style={{ color: phase === "done" && k === "INTEGRITY" ? "#39FF14" : "rgba(26,26,26,0.7)" }}>
                    {v}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* System log */}
          <div className="flex-1 border border-border/10 p-4 relative overflow-hidden"
            style={{ background: "rgba(255,255,255,0.5)", backdropFilter: "blur(8px)" }}>
            <span className="absolute top-0 left-0 w-3 h-3 border-t border-l border-[#39FF14]/30" />
            <span className="absolute bottom-0 right-0 w-3 h-3 border-b border-r border-[#39FF14]/30" />

            <div className="flex items-center gap-2 mb-4">
              <span className="status-pulse" />
              <p className="font-mono text-[9px] tracking-[0.2em] text-[#39FF14]/50 uppercase">SYSTEM LOG</p>
            </div>

            <div className="space-y-1.5 font-mono text-[10px] overflow-hidden">
              <AnimatePresence>
                {logLines.map((line, i) => (
                  <motion.p
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{
                      color: line.startsWith("[OK]") ? "rgba(57,255,20,0.7)"
                        : line.startsWith("[WARN]") ? "rgba(255,180,50,0.7)"
                        : "rgba(26,26,26,0.4)"
                    }}
                  >
                    {line}
                  </motion.p>
                ))}
              </AnimatePresence>
            </div>

            {/* Fade out bottom */}
            <div className="absolute bottom-0 left-0 right-0 h-12 pointer-events-none"
              style={{ background: "linear-gradient(to top, rgba(255,255,255,0.5), transparent)" }} />
          </div>

          {/* Status indicator */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className={`w-1.5 h-1.5 rounded-full ${phase === "idle" ? "bg-foreground/20" : "bg-[#39FF14] shadow-[0_0_6px_rgba(57,255,20,0.8)]"}`} />
              <span className="font-mono text-[9px] tracking-[0.15em] text-foreground/35 uppercase">
                {phase === "idle" ? "STANDBY" : phase === "scanning" ? "SCANNING" : "WORKSPACE READY"}
              </span>
            </div>
            <span className="font-mono text-[9px] text-foreground/20">LATENCY: &lt;2ms</span>
          </div>
        </div>
      </div>
    </div>
  )
}
