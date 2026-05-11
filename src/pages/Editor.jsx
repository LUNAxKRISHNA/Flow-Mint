import { useState, useCallback, useRef } from "react"
import { useNavigate, useLocation } from "react-router-dom"
import { ArrowLeft, Save, Play, ChevronDown } from "lucide-react"
import { Button } from "@/components/ui/button"
import Toolbar from "@/components/editor/Toolbar"
import Canvas from "@/components/editor/Canvas"
import PropertiesPanel from "@/components/editor/PropertiesPanel"
import CsvUploadModal from "@/components/editor/CsvUploadModal"
import GenerationProgress from "@/components/editor/GenerationProgress"
import { runBulkGeneration } from "@/lib/BulkEngine"

let nextId = 1

export default function Editor() {
  const navigate = useNavigate()
  const location = useLocation()
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false)

  // ── Template image from onboarding ─────────────────────────────────
  const templateImage = location.state?.templateImage ?? null
  const fileName = location.state?.fileName ?? "Untitled Template"

  // ── Placeholders state ──────────────────────────────────────────────
  const [placeholders, setPlaceholders] = useState([])
  const [selectedId, setSelectedId] = useState(null)

  // ── CSV & Mapping state ─────────────────────────────────────────────
  const [csvData, setCsvData] = useState({ headers: [], rows: [], fileName: null })
  const [mappings, setMappings] = useState({}) // { placeholderId: csvHeaderName }

  // ── Bulk generation state ────────────────────────────────────────────
  const [exportFormat, setExportFormat] = useState("pdf") // "pdf" | "png"
  const [showFormatMenu, setShowFormatMenu] = useState(false)
  const [genProgress, setGenProgress] = useState({ isOpen: false, current: 0, total: 0, isZipping: false, isDone: false })

  const canvasSizeRef = useRef({ w: 794, h: 1123 })

  const selectedPlaceholder = placeholders.find((p) => p.id === selectedId) ?? null

  // Handle CSV data ingestion
  const handleCsvData = useCallback((data) => {
    setCsvData(data)
    
    // Auto-mapping logic
    const newMappings = { ...mappings }
    placeholders.forEach(ph => {
      // Fuzzy match: lowercase, remove special chars
      const normalizedPh = ph.key.toLowerCase().replace(/[^a-z0-9]/g, "")
      const match = data.headers.find(header => {
        const normalizedHeader = header.toLowerCase().replace(/[^a-z0-9]/g, "")
        return normalizedHeader.includes(normalizedPh) || normalizedPh.includes(normalizedHeader)
      })
      if (match && !newMappings[ph.id]) {
        newMappings[ph.id] = match
      }
    })
    setMappings(newMappings)
  }, [placeholders, mappings])

  const handleUpdateMapping = useCallback((placeholderId, headerName) => {
    setMappings(prev => ({ ...prev, [placeholderId]: headerName }))
  }, [])

  // Add a new placeholder near the center
  const handleAddPlaceholder = useCallback(() => {
    const id = `ph_${nextId++}`
    setPlaceholders((prev) => [
      ...prev,
      {
        id,
        key: "New Field",
        x: 100 + Math.random() * 80,
        y: 100 + Math.random() * 80,
        width: 220,
        height: 44,
        fontSize: 20,
        fontFamily: "Inter",
        fontWeight: "Normal",
        align: "left",
        color: "#1e293b",
      },
    ])
    setSelectedId(id)
  }, [])

  // Update position after drag
  const handlePositionChange = useCallback((id, x, y) => {
    setPlaceholders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, x, y } : p))
    )
  }, [])

  // Update a property (key, fontSize, etc.)
  // When fontSize changes, auto-expand the placeholder height so text fits.
  const handlePropertyChange = useCallback((id, field, value) => {
    setPlaceholders((prev) =>
      prev.map((p) => {
        if (p.id !== id) return p
        const updated = { ...p, [field]: value }
        if (field === "fontSize") {
          const minH = Math.ceil(value * 1.8) + 8  // line-height ≈ 1.8× + padding
          if (updated.height < minH) updated.height = minH
        }
        return updated
      })
    )
  }, [])

  // Delete selected placeholder
  const handleDeletePlaceholder = useCallback((id) => {
    setPlaceholders((prev) => prev.filter((p) => p.id !== id))
    setSelectedId(null)
  }, [])

  // Apply resize from corner drag (x, y, width, height all may change)
  const handleResize = useCallback((id, dims) => {
    setPlaceholders((prev) =>
      prev.map((p) => (p.id === id ? { ...p, ...dims } : p))
    )
  }, [])

  // Canvas size tracked by the Canvas component – lifted up so BulkEngine can use it
  const handleCanvasSizeChange = useCallback((size) => {
    canvasSizeRef.current = size
  }, [])

  // ── Bulk generation handler ──────────────────────────────────────────
  const handleGenerate = useCallback(async () => {
    if (!csvData.rows.length) {
      alert("Please upload a CSV file first via the toolbar.")
      return
    }
    setGenProgress({ isOpen: true, current: 0, total: csvData.rows.length, isZipping: false, isDone: false })

    try {
      await runBulkGeneration({
        rows: csvData.rows,
        placeholders,
        mappings,
        templateImage,
        canvasSize: canvasSizeRef.current,
        exportFormat,
        onProgress: (current, total) => {
          const isZipping = current === total
          setGenProgress((prev) => ({ ...prev, current, isZipping, isDone: false }))
        },
      })
      setGenProgress((prev) => ({ ...prev, isZipping: false, isDone: true }))
    } catch (err) {
      console.error("Bulk generation failed:", err)
      setGenProgress((prev) => ({ ...prev, isOpen: false }))
    }
  }, [csvData, placeholders, mappings, templateImage, exportFormat])

  return (
    <div className="h-screen w-screen flex flex-col bg-background font-['Space_Grotesk']">
      {/* Top Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 z-50 relative">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/setup")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <h1 className="font-medium text-sm truncate max-w-[240px]">{fileName}</h1>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm shrink-0">Draft</span>
          {/* Placeholder count badge */}
          {placeholders.length > 0 && (
            <span className="text-xs font-mono text-[#39FF14] bg-[#39FF14]/10 px-2 py-0.5 rounded-sm border border-[#39FF14]/20 shrink-0">
              {placeholders.length} field{placeholders.length !== 1 ? "s" : ""}
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>

          {/* Format toggle + Generate button */}
          <div className="flex items-stretch" style={{ border: "1px solid rgba(57,255,20,0.3)", borderRadius: 2 }}>
            {/* Format picker */}
            <div className="relative">
              <button
                onClick={() => setShowFormatMenu((p) => !p)}
                className="flex items-center gap-1 px-3 h-full font-mono text-[10px] tracking-widest uppercase text-[#39FF14] hover:bg-[#39FF14]/10 transition-colors"
                style={{ borderRight: "1px solid rgba(57,255,20,0.3)" }}
              >
                {exportFormat.toUpperCase()}
                <ChevronDown className="h-3 w-3" />
              </button>
              {showFormatMenu && (
                <>
                  {/* Click-away backdrop */}
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setShowFormatMenu(false)}
                  />
                  <div
                    className="absolute top-full right-0 mt-1 z-50 font-mono text-[10px] tracking-widest uppercase"
                    style={{ background: "rgba(10,10,10,0.97)", border: "1px solid rgba(57,255,20,0.25)", minWidth: 80, boxShadow: "0 8px 32px rgba(0,0,0,0.6)" }}
                  >
                    {["pdf", "png"].map((fmt) => (
                      <button
                        key={fmt}
                        onClick={() => { setExportFormat(fmt); setShowFormatMenu(false) }}
                        className="w-full px-4 py-2.5 text-left hover:bg-[#39FF14]/10 transition-colors flex items-center gap-2"
                        style={{ color: exportFormat === fmt ? "#39FF14" : "rgba(255,255,255,0.5)" }}
                      >
                        {exportFormat === fmt && <span className="w-1 h-1 rounded-full bg-[#39FF14]" />}
                        {fmt.toUpperCase()}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>

            {/* Generate button */}
            <button
              onClick={handleGenerate}
              className="flex items-center gap-2 px-4 py-1.5 font-mono text-[10px] tracking-widest uppercase font-bold text-black hover:opacity-90 transition-opacity"
              style={{ background: "#39FF14" }}
            >
              <Play className="h-3 w-3" />
              Generate {csvData.rows.length > 0 ? `(${csvData.rows.length})` : ""}
            </button>
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <Toolbar
          onOpenCsvModal={() => setIsCsvModalOpen(true)}
          onAddPlaceholder={handleAddPlaceholder}
        />

        {/* Center Canvas */}
        <div className="flex-1 overflow-auto relative bg-[#f0f0ee]">
          <Canvas
            templateImage={templateImage}
            placeholders={placeholders}
            selectedId={selectedId}
            onSelectId={setSelectedId}
            onPositionChange={handlePositionChange}
            onResize={handleResize}
            onPropertyChange={handlePropertyChange}
            onCanvasSizeChange={handleCanvasSizeChange}
          />
        </div>

        {/* Right Properties Panel */}
        <PropertiesPanel
          placeholder={selectedPlaceholder}
          onPropertyChange={handlePropertyChange}
          onDelete={handleDeletePlaceholder}
        />
      </main>

      {/* Modals */}
      <CsvUploadModal 
        isOpen={isCsvModalOpen} 
        onClose={() => setIsCsvModalOpen(false)} 
        placeholders={placeholders}
        csvData={csvData}
        mappings={mappings}
        onCsvData={handleCsvData}
        onUpdateMapping={handleUpdateMapping}
      />

      {/* Bulk Generation Progress */}
      <GenerationProgress
        isOpen={genProgress.isOpen}
        current={genProgress.current}
        total={genProgress.total}
        format={exportFormat}
        isZipping={genProgress.isZipping}
        isDone={genProgress.isDone}
        onClose={() => setGenProgress((p) => ({ ...p, isOpen: false, isDone: false }))}
      />
    </div>
  )
}
