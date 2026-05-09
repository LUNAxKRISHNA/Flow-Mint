import { Type, AlignLeft, AlignCenter, AlignRight } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PropertiesPanel({ selectedElement }) {
  if (!selectedElement) {
    return (
      <aside className="w-72 border-l border-border bg-card/50 flex flex-col items-center justify-center text-center p-6 z-10 shadow-sm">
        <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center mb-4">
          <Type className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-sm text-foreground">No Element Selected</h3>
        <p className="text-xs text-muted-foreground mt-1">
          Click on a placeholder in the canvas to edit its properties.
        </p>
      </aside>
    )
  }

  return (
    <aside className="w-72 border-l border-border bg-card/50 flex flex-col z-10 shadow-sm">
      <div className="h-12 border-b border-border flex items-center px-4">
        <h2 className="font-semibold text-sm">Properties</h2>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">
          
          {/* Field Settings */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Field</h3>
            <div className="space-y-1">
              <Label className="text-xs">Placeholder Key</Label>
              <Input defaultValue="Name" className="h-8 text-sm" />
            </div>
          </div>

          {/* Typography */}
          <div className="space-y-3 pt-4 border-t border-border">
            <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Typography</h3>
            
            <div className="space-y-1">
              <Label className="text-xs">Font Family</Label>
              <select className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                <option>Inter</option>
                <option>Roboto</option>
                <option>Playfair Display</option>
                <option>Lora</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Font Size</Label>
                <div className="relative">
                  <Input defaultValue="24" className="h-8 text-sm pr-6" />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">px</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Weight</Label>
                <select className="flex h-8 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring">
                  <option>Normal</option>
                  <option>Medium</option>
                  <option>Bold</option>
                </select>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <Label className="text-xs">Alignment</Label>
              <div className="flex border border-input rounded-md overflow-hidden h-8">
                <Button variant="ghost" className="flex-1 h-full rounded-none bg-accent text-accent-foreground border-r border-input">
                  <AlignLeft className="h-4 w-4" />
                </Button>
                <Button variant="ghost" className="flex-1 h-full rounded-none hover:bg-accent/50 border-r border-input">
                  <AlignCenter className="h-4 w-4 text-muted-foreground" />
                </Button>
                <Button variant="ghost" className="flex-1 h-full rounded-none hover:bg-accent/50">
                  <AlignRight className="h-4 w-4 text-muted-foreground" />
                </Button>
              </div>
            </div>

            <div className="space-y-1 pt-2">
              <Label className="text-xs">Color</Label>
              <div className="flex items-center gap-2">
                <div className="h-8 w-8 rounded-md border border-input bg-slate-800 shadow-sm" />
                <Input defaultValue="#1e293b" className="h-8 text-sm uppercase font-mono" />
              </div>
            </div>

          </div>
        </div>
      </ScrollArea>
    </aside>
  )
}
