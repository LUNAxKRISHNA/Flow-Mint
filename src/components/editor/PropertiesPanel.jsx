import { Type, AlignLeft, AlignCenter, AlignRight, Trash2 } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"

export default function PropertiesPanel({ placeholder, onPropertyChange, onDelete }) {
  if (!placeholder) {
    return (
      <aside className="w-72 border-l border-border bg-card/50 flex flex-col items-center justify-center text-center p-6 z-10 shadow-sm">
        <div className="w-12 h-12 border border-dashed border-border/40 flex items-center justify-center mb-4">
          <Type className="h-5 w-5 text-muted-foreground" />
        </div>
        <h3 className="font-medium text-sm text-foreground">No Field Selected</h3>
        <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
          Click a placeholder on the canvas, or use the{" "}
          <span className="font-semibold text-foreground/70">Add Text Field</span> button to create one.
        </p>
        {/* Field count hint */}
        <div className="mt-6 px-3 py-2 border border-border/20 w-full text-left"
          style={{ background: "rgba(57,255,20,0.03)" }}>
          <p className="font-mono text-[9px] tracking-widest text-foreground/30 uppercase">INSPECTOR READY</p>
          <p className="font-mono text-[9px] text-[#39FF14]/40 mt-1">AWAITING SELECTION...</p>
        </div>
      </aside>
    )
  }

  const change = (field, value) => onPropertyChange(placeholder.id, field, value)

  return (
    <aside className="w-72 border-l border-border bg-card/50 flex flex-col z-10 shadow-sm">
      {/* Header */}
      <div className="h-12 border-b border-border flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" style={{ boxShadow: "0 0 4px rgba(57,255,20,0.8)" }} />
          <h2 className="font-semibold text-sm">Field Inspector</h2>
        </div>
        <button
          onClick={() => onDelete(placeholder.id)}
          className="text-muted-foreground hover:text-red-500 transition-colors p-1"
          title="Delete field"
        >
          <Trash2 className="h-3.5 w-3.5" />
        </button>
      </div>

      {/* Live token preview */}
      <div className="px-4 py-3 border-b border-border/30"
        style={{ background: "rgba(57,255,20,0.04)" }}>
        <p className="font-mono text-[9px] tracking-widest text-foreground/30 uppercase mb-1">Token Preview</p>
        <p className="font-mono text-sm font-semibold" style={{ color: "#39FF14" }}>
          {`{{${placeholder.key}}}`}
        </p>
        <p className="font-mono text-[9px] text-foreground/30 mt-1">
          x: {Math.round(placeholder.x)}px · y: {Math.round(placeholder.y)}px
        </p>
      </div>

      <ScrollArea className="flex-1 p-4">
        <div className="space-y-6">

          {/* Field Name */}
          <div className="space-y-2">
            <Label className="text-xs font-mono tracking-widest text-foreground/50 uppercase">Field Name</Label>
            <Input
              value={placeholder.key}
              onChange={(e) => change("key", e.target.value)}
              className="h-8 text-sm font-mono"
              placeholder="e.g. Name, Date, Score"
            />
            <p className="text-[10px] text-muted-foreground">
              This becomes <code className="font-mono bg-muted px-1 rounded">{`{{${placeholder.key}}}`}</code> in output
            </p>
          </div>

          {/* Typography */}
          <div className="space-y-3 pt-4 border-t border-border/30">
            <h3 className="text-xs font-mono tracking-widest text-foreground/50 uppercase">Typography</h3>

            <div className="space-y-1">
              <Label className="text-xs">Font Family</Label>
              <select
                value={placeholder.fontFamily}
                onChange={(e) => change("fontFamily", e.target.value)}
                className="flex h-8 w-full border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
              >
                <option>Inter</option>
                <option>Space Grotesk</option>
                <option>Roboto</option>
                <option>Playfair Display</option>
                <option>Lora</option>
              </select>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <div className="space-y-1">
                <Label className="text-xs">Font Size</Label>
                <div className="relative">
                  <Input
                    type="number"
                    value={placeholder.fontSize}
                    onChange={(e) => change("fontSize", Number(e.target.value))}
                    className="h-8 text-sm pr-6"
                    min={8}
                    max={120}
                  />
                  <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">px</span>
                </div>
              </div>
              <div className="space-y-1">
                <Label className="text-xs">Weight</Label>
                <select
                  value={placeholder.fontWeight}
                  onChange={(e) => change("fontWeight", e.target.value)}
                  className="flex h-8 w-full border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                >
                  <option>Normal</option>
                  <option>Medium</option>
                  <option>Bold</option>
                </select>
              </div>
            </div>

            {/* Alignment */}
            <div className="space-y-1 pt-1">
              <Label className="text-xs">Alignment</Label>
              <div className="flex border border-input overflow-hidden h-8">
                {[
                  { value: "left", icon: <AlignLeft className="h-3.5 w-3.5" /> },
                  { value: "center", icon: <AlignCenter className="h-3.5 w-3.5" /> },
                  { value: "right", icon: <AlignRight className="h-3.5 w-3.5" /> },
                ].map(({ value, icon }) => (
                  <button
                    key={value}
                    onClick={() => change("align", value)}
                    className={`flex-1 h-full flex items-center justify-center border-r last:border-r-0 border-input transition-colors
                      ${placeholder.align === value
                        ? "bg-[#39FF14]/10 text-[#39FF14]"
                        : "text-muted-foreground hover:bg-muted/50"
                      }`}
                  >
                    {icon}
                  </button>
                ))}
              </div>
            </div>

            {/* Color */}
            <div className="space-y-1 pt-1">
              <Label className="text-xs">Text Color</Label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  value={placeholder.color}
                  onChange={(e) => change("color", e.target.value)}
                  className="h-8 w-8 rounded-sm border border-input cursor-pointer bg-transparent p-0.5"
                />
                <Input
                  value={placeholder.color}
                  onChange={(e) => change("color", e.target.value)}
                  className="h-8 text-sm uppercase font-mono"
                />
              </div>
            </div>
          </div>

          {/* Position (read-only display) */}
          <div className="space-y-2 pt-4 border-t border-border/30">
            <h3 className="text-xs font-mono tracking-widest text-foreground/50 uppercase">Position</h3>
            <div className="grid grid-cols-2 gap-2">
              {[["X", "x"], ["Y", "y"], ["W", "width"], ["H", "height"]].map(([label, key]) => (
                <div key={key} className="space-y-1">
                  <Label className="text-xs">{label}</Label>
                  <div className="h-8 border border-input bg-muted/30 px-3 flex items-center">
                    <span className="text-sm font-mono text-foreground/60">{Math.round(placeholder[key])}</span>
                    <span className="text-xs text-muted-foreground ml-auto">px</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      </ScrollArea>

      {/* Delete footer */}
      <div className="p-4 border-t border-border/30">
        <Button
          variant="outline"
          size="sm"
          className="w-full text-red-500 border-red-200 hover:bg-red-50 hover:text-red-600 transition-colors"
          onClick={() => onDelete(placeholder.id)}
        >
          <Trash2 className="h-3.5 w-3.5 mr-2" />
          Remove Field
        </Button>
      </div>
    </aside>
  )
}

