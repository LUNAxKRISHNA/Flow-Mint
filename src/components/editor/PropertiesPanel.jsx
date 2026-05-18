import { Type, AlignLeft, AlignCenter, AlignRight, Trash2, Italic, X } from "lucide-react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { FONT_LIST } from "@/constants/fonts"

export default function PropertiesPanel({ placeholder, onPropertyChange, onDelete, isOpen = false, onClose }) {
  // Shared sheet class: fixed bottom sheet on mobile, static sidebar on desktop
  const sheetClass = [
    // Mobile: fixed bottom sheet
    "fixed bottom-0 left-0 right-0 z-50 flex flex-col",
    "bg-card border-t border-border rounded-t-2xl",
    "max-h-[80dvh]",
    "transition-transform duration-300 ease-out",
    isOpen ? "translate-y-0" : "translate-y-full",
    // Desktop: override to static sidebar
    "md:relative md:bottom-auto md:left-auto md:right-auto",
    "md:w-72 md:max-h-none md:rounded-none md:border-t-0 md:border-l",
    "md:translate-y-0 md:z-10 md:shadow-sm",
  ].join(" ")

  return (
    <>
      {/* Mobile backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      <aside className={sheetClass}>
        {/* Drag handle — mobile only */}
        <div className="flex justify-center pt-3 pb-1 md:hidden flex-shrink-0">
          <div className="w-10 h-1 rounded-full bg-border/50" />
        </div>

        {!placeholder ? (
          /* ── Empty state ──────────────────────────────────── */
          <div className="flex flex-col items-center justify-center text-center p-6 flex-1">
            <div className="w-12 h-12 border border-dashed border-border/40 flex items-center justify-center mb-4">
              <Type className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-medium text-sm text-foreground">No Field Selected</h3>
            <p className="text-xs text-muted-foreground mt-2 leading-relaxed">
              Click a placeholder on the canvas, or use the{" "}
              <span className="font-semibold text-foreground/70">Add Text Field</span> button to create one.
            </p>
            <div className="mt-6 px-3 py-2 border border-border/20 w-full text-left"
              style={{ background: "rgba(57,255,20,0.03)" }}>
              <p className="font-mono text-[9px] tracking-widest text-foreground/30 uppercase">INSPECTOR READY</p>
              <p className="font-mono text-[9px] text-[#39FF14]/40 mt-1">AWAITING SELECTION...</p>
            </div>
          </div>
        ) : (
          /* ── Populated state ──────────────────────────────── */
          <>
            {/* Header */}
            <div className="h-12 border-b border-border flex items-center justify-between px-4 flex-shrink-0">
              <div className="flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" style={{ boxShadow: "0 0 4px rgba(57,255,20,0.8)" }} />
                <h2 className="font-semibold text-sm">Field Inspector</h2>
              </div>
              <button
                onClick={onClose || (() => {})}
                className="text-muted-foreground hover:text-foreground transition-colors p-1"
                title="Close inspector"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </div>

            {/* Live token preview */}
            <div className="px-4 py-3 border-b border-border/30 flex-shrink-0"
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
                    onChange={(e) => onPropertyChange(placeholder.id, "key", e.target.value)}
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
                      onChange={(e) => onPropertyChange(placeholder.id, "fontFamily", e.target.value)}
                      className="flex h-8 w-full border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring font-mono"
                    >
                      {Array.from(new Set(FONT_LIST.map(f => f.category))).map(cat => (
                        <optgroup key={cat} label={cat.toUpperCase()} className="text-[10px] tracking-widest bg-muted/50">
                          {FONT_LIST.filter(f => f.category === cat).map(font => (
                            <option key={font.name} value={font.name} style={{ fontFamily: font.name }}>
                              {font.name}
                            </option>
                          ))}
                        </optgroup>
                      ))}
                    </select>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-1">
                      <Label className="text-xs">Font Size</Label>
                      <div className="relative">
                        <Input
                          type="number"
                          value={placeholder.fontSize}
                          onChange={(e) => onPropertyChange(placeholder.id, "fontSize", Number(e.target.value))}
                          className="h-8 text-sm pr-6"
                          min={8}
                          max={120}
                        />
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">px</span>
                      </div>
                    </div>
                    <div className="grid grid-cols-[1fr_auto] gap-2 items-end">
                      <div className="space-y-1">
                        <Label className="text-xs">Weight</Label>
                        <select
                          value={placeholder.fontWeight}
                          onChange={(e) => onPropertyChange(placeholder.id, "fontWeight", e.target.value)}
                          className="flex h-8 w-full border border-input bg-background px-3 py-1 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                        >
                          <option>Normal</option>
                          <option>Medium</option>
                          <option>Bold</option>
                        </select>
                      </div>
                      <button
                        onClick={() => onPropertyChange(placeholder.id, "fontStyle", placeholder.fontStyle === "italic" ? "normal" : "italic")}
                        className={`h-8 w-8 flex items-center justify-center border border-input rounded-sm transition-colors
                          ${placeholder.fontStyle === "italic"
                            ? "bg-[#39FF14]/10 text-[#39FF14] border-[#39FF14]/30"
                            : "text-muted-foreground hover:bg-muted/50"
                          }`}
                        title="Italic"
                      >
                        <Italic className="h-3.5 w-3.5" />
                      </button>
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
                          onClick={() => onPropertyChange(placeholder.id, "align", value)}
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
                        onChange={(e) => onPropertyChange(placeholder.id, "color", e.target.value)}
                        className="h-8 w-8 rounded-sm border border-input cursor-pointer bg-transparent p-0.5"
                      />
                      <Input
                        value={placeholder.color}
                        onChange={(e) => onPropertyChange(placeholder.id, "color", e.target.value)}
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
            <div className="p-4 border-t border-border/30 flex-shrink-0">
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
          </>
        )}
      </aside>
    </>
  )
}
