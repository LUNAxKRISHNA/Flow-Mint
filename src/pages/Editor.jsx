import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Save, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import Toolbar from "@/components/editor/Toolbar"
import Canvas from "@/components/editor/Canvas"
import PropertiesPanel from "@/components/editor/PropertiesPanel"
import CsvUploadModal from "@/components/editor/CsvUploadModal"

export default function Editor() {
  const navigate = useNavigate()
  const [isCsvModalOpen, setIsCsvModalOpen] = useState(false)
  
  // Mock state for selected element
  const [selectedElement, setSelectedElement] = useState(null)

  return (
    <div className="h-screen w-screen flex flex-col bg-background overflow-hidden">
      {/* Top Header */}
      <header className="h-14 border-b border-border flex items-center justify-between px-4 bg-card/50 z-10">
        <div className="flex items-center gap-3">
          <Button variant="ghost" size="icon" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="h-4 w-px bg-border mx-1" />
          <h1 className="font-medium text-sm">Event Certificates Batch</h1>
          <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-sm">Draft</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
          <Button size="sm">
            <Play className="h-4 w-4 mr-2" />
            Generate PDFs
          </Button>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Toolbar */}
        <Toolbar onOpenCsvModal={() => setIsCsvModalOpen(true)} />

        {/* Center Canvas */}
        <div className="flex-1 bg-muted/30 overflow-auto relative">
          <Canvas selectedElement={selectedElement} onSelectElement={setSelectedElement} />
        </div>

        {/* Right Properties Panel */}
        <PropertiesPanel selectedElement={selectedElement} />
      </main>

      {/* Modals */}
      <CsvUploadModal isOpen={isCsvModalOpen} onClose={() => setIsCsvModalOpen(false)} />
    </div>
  )
}
