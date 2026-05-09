import { Type, Image as ImageIcon, Database, ZoomIn, ZoomOut, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Toolbar({ onOpenCsvModal }) {
  return (
    <aside className="w-16 border-r border-border bg-card/50 flex flex-col items-center py-4 gap-4 z-10 shadow-sm">
      <div className="flex flex-col gap-2">
        <ToolbarButton icon={<MousePointer2 />} label="Select" active />
        <ToolbarButton icon={<Type />} label="Add Text" />
      </div>
      
      <div className="h-px w-8 bg-border" />
      
      <div className="flex flex-col gap-2">
        <ToolbarButton icon={<ImageIcon />} label="Upload Template" />
        <ToolbarButton icon={<Database />} label="Upload CSV" onClick={onOpenCsvModal} />
      </div>

      <div className="mt-auto flex flex-col gap-2">
        <ToolbarButton icon={<ZoomIn />} label="Zoom In" />
        <ToolbarButton icon={<ZoomOut />} label="Zoom Out" />
      </div>
    </aside>
  )
}

function ToolbarButton({ icon, label, active, onClick }) {
  return (
    <div className="group relative">
      <Button 
        variant="ghost" 
        size="icon" 
        className={`h-10 w-10 rounded-xl transition-colors ${active ? 'bg-primary/10 text-primary' : 'text-muted-foreground hover:text-foreground'}`}
        onClick={onClick}
      >
        <div className="h-5 w-5 [&>svg]:w-full [&>svg]:h-full">
          {icon}
        </div>
      </Button>
      {/* Tooltip */}
      <div className="absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
        {label}
      </div>
    </div>
  )
}
