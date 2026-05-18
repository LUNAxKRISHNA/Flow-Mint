import { Type, Database, ZoomIn, ZoomOut, MousePointer2 } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function Toolbar({ onOpenCsvModal, onAddPlaceholder, onZoomIn, onZoomOut }) {
  return (
    <aside className="
      /* Mobile: horizontal bottom bar */
      w-full h-14 flex-row border-t border-border
      flex items-center justify-around px-4
      /* Desktop: vertical left sidebar */
      md:w-16 md:h-auto md:flex-col md:items-center md:py-4 md:gap-4
      md:border-t-0 md:border-r
      bg-card/50 z-10 shadow-sm
    ">
      <div className="flex flex-row md:flex-col gap-2">
        <ToolbarButton icon={<MousePointer2 />} label="Select" active />
        <ToolbarButton icon={<Type />} label="Add Text Field" onClick={onAddPlaceholder} />
      </div>

      <div className="h-px w-8 bg-border hidden md:block" />
      <div className="w-px h-8 bg-border md:hidden" />

      <div className="flex flex-row md:flex-col gap-2">
        <ToolbarButton icon={<Database />} label="Upload CSV" onClick={onOpenCsvModal} />
      </div>

      <div className="h-px w-8 bg-border hidden md:block" />
      <div className="w-px h-8 bg-border md:hidden" />

      <div className="mt-auto md:flex flex-row md:flex-col gap-2 flex flex-row">
        <ToolbarButton icon={<ZoomIn />} label="Zoom In" onClick={onZoomIn} />
        <ToolbarButton icon={<ZoomOut />} label="Zoom Out" onClick={onZoomOut} />
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
      {/* Tooltip — desktop only (would overflow off-screen on mobile) */}
      <div className="hidden md:block absolute left-14 top-1/2 -translate-y-1/2 px-2 py-1 bg-popover text-popover-foreground text-xs rounded-md shadow-md opacity-0 pointer-events-none group-hover:opacity-100 transition-opacity z-50 whitespace-nowrap">
        {label}
      </div>
    </div>
  )
}
