import { useState, useRef } from "react"
import { UploadCloud, FileSpreadsheet, CheckCircle2, ChevronRight, AlertCircle } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CsvUploadModal({ 
  isOpen, 
  onClose, 
  placeholders, 
  csvData, 
  mappings, 
  filenameHeader,
  onCsvData, 
  onUpdateMapping,
  onUpdateFilenameHeader
}) {
  const [activeTab, setActiveTab] = useState("upload")
  const [isParsing, setIsParsing] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileUpload = (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!file.name.endsWith(".csv")) {
      setError("Please upload a valid CSV file.")
      return
    }

    setIsParsing(true)
    setError(null)

    const reader = new FileReader()
    reader.onload = (event) => {
      try {
        const text = event.target.result
        const lines = text.split(/\r?\n/).filter(line => line.trim() !== "")
        
        if (lines.length < 1) throw new Error("File is empty")

        // Basic CSV parsing (handles simple commas, could be improved for quotes)
        const headers = lines[0].split(",").map(h => h.trim().replace(/^["']|["']$/g, ""))
        const rows = lines.slice(1).map(line => {
          const values = line.split(",").map(v => v.trim().replace(/^["']|["']$/g, ""))
          const row = {}
          headers.forEach((header, i) => {
            row[header] = values[i] || ""
          })
          return row
        })

        onCsvData({
          headers,
          rows,
          fileName: file.name,
          size: (file.size / 1024).toFixed(1) + " KB"
        })

        if (rows.length > 100) {
          setError(`SYSTEM_OVERLOAD: Detected ${rows.length} records. The current module is limited to 100 records per batch for stability.`);
          setIsParsing(false);
          return;
        }
        
        setTimeout(() => {
          setIsParsing(false)
          setActiveTab("map")
        }, 800)
      } catch (err) {
        setError("Failed to parse CSV. Ensure it is correctly formatted.")
        setIsParsing(false)
      }
    }
    reader.readAsText(file)
  }

  const mappedCount = placeholders.filter(ph => mappings[ph.id]).length

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[640px] p-0 overflow-hidden bg-card border-border/40 font-['Space_Grotesk']">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-muted/30 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-primary" />
          <DialogTitle className="text-xl flex items-center gap-2">
            <span className="font-mono text-xs text-primary/40">[DATA_SOURCE_INGESTION]</span>
          </DialogTitle>
          <DialogDescription className="text-foreground/50">
            Link your spreadsheet columns to document variables.
          </DialogDescription>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="px-6 border-b border-border bg-muted/10 pt-2">
            <TabsList className="bg-transparent h-auto p-0 space-x-8">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 pt-2 text-xs font-mono tracking-widest uppercase"
              >
                01. Ingestion
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                disabled={!csvData.fileName}
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 pt-2 text-xs font-mono tracking-widest uppercase disabled:opacity-30"
              >
                02. Architecture
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="upload" className="m-0 focus-visible:outline-none flex flex-col gap-6">
              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-border/20 rounded-lg p-10 flex flex-col items-center justify-center text-center bg-muted/5 hover:bg-primary/5 hover:border-primary/30 transition-all cursor-pointer group"
              >
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <UploadCloud className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-bold mb-1 tracking-tight">
                  {isParsing ? "PARSING_DATA_STREAM..." : "SELECT CSV MODULE"}
                </h3>
                <p className="text-xs text-foreground/40 max-w-xs mb-6 font-mono uppercase tracking-wider">
                  {isParsing ? "Analyzing headers & integrity" : "Ensure Row 0 contains variable headers"}
                </p>
                <input 
                  type="file" 
                  ref={fileInputRef} 
                  className="hidden" 
                  accept=".csv" 
                  onChange={handleFileUpload} 
                />
                {!isParsing && <Button variant="secondary" className="font-mono text-[10px] tracking-widest uppercase">Browse Filesystem</Button>}
              </div>

              {error && (
                <div className="p-3 bg-red-500/10 border border-red-500/20 rounded flex items-center gap-3 text-red-500 text-xs font-mono">
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {error}
                </div>
              )}

              {csvData.fileName && !isParsing && (
                <div className="flex items-center justify-between p-4 border border-primary/20 rounded bg-primary/5 animate-fade-up">
                  <div className="flex items-center gap-4">
                    <div className="h-10 w-10 rounded bg-primary/10 flex items-center justify-center">
                      <FileSpreadsheet className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold tracking-tight">{csvData.fileName}</h4>
                      <p className="text-[10px] font-mono text-primary/60 uppercase tracking-widest">{csvData.rows.length} records detected • {csvData.size}</p>
                    </div>
                  </div>
                  <CheckCircle2 className="h-5 w-5 text-primary" />
                </div>
              )}
            </TabsContent>

            <TabsContent value="map" className="m-0 focus-visible:outline-none space-y-6">
              <div className="flex justify-between items-center">
                <span className="font-mono text-[10px] tracking-[0.2em] text-foreground/60 uppercase font-semibold">Pipeline Mapping</span>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <span className="font-mono text-[10px] tracking-[0.2em] text-primary uppercase font-semibold">
                    {mappedCount} / {placeholders.length} Synchronized
                  </span>
                </div>
              </div>

              {/* Filename Source Selection */}
              <div className="p-4 border border-primary/20 rounded bg-primary/5 flex items-center justify-between gap-4 animate-fade-up">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-primary/10 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <h4 className="text-[11px] font-bold tracking-tight uppercase">Filename Source</h4>
                    <p className="text-[9px] font-mono text-primary/60 uppercase tracking-widest">Identify records by this field</p>
                  </div>
                </div>
                <select 
                  value={filenameHeader || ""}
                  onChange={(e) => onUpdateFilenameHeader(e.target.value)}
                  className="h-8 min-w-[160px] rounded border border-primary/30 bg-card px-2 text-[10px] font-mono tracking-tight focus:outline-none focus:ring-1 focus:ring-primary/40 text-foreground"
                >
                  <option value="">-- AUTO-INDEX --</option>
                  {csvData.headers.map(header => (
                    <option key={header} value={header}>{header}</option>
                  ))}
                </select>
              </div>
              
              <div className="border border-border/20 rounded overflow-hidden bg-muted/5 shadow-sm">
                <div className="grid grid-cols-2 p-3 bg-muted/50 border-b border-border/20 font-mono text-[10px] text-foreground/60 uppercase tracking-[0.15em] font-bold">
                  <div>Placeholder Target</div>
                  <div>CSV Source Origin</div>
                </div>
                
                <div className="divide-y divide-border/10 max-h-[200px] overflow-auto custom-scrollbar bg-card">
                  {placeholders.length === 0 ? (
                    <div className="p-10 text-center text-xs text-foreground/40 font-mono">
                      No placeholders detected in workspace.<br/>Add a text field first.
                    </div>
                  ) : (
                    placeholders.map((ph) => (
                      <MappingRow 
                        key={ph.id} 
                        placeholder={ph} 
                        headers={csvData.headers} 
                        mapping={mappings[ph.id]}
                        sampleValue={csvData.rows[0]?.[mappings[ph.id]]}
                        onUpdate={(header) => onUpdateMapping(ph.id, header)}
                      />
                    ))
                  )}
                </div>
              </div>

              {/* Technical Summary Panel */}
              <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2 border border-border/20 p-4 rounded bg-muted/10 relative overflow-hidden group">
                   <div className="absolute top-0 right-0 p-2 opacity-10">
                      <FileSpreadsheet className="h-12 w-12" />
                   </div>
                   <p className="font-mono text-[10px] text-foreground/50 uppercase tracking-widest mb-3 font-bold">Data Integrity Analysis</p>
                   <div className="space-y-2">
                      <div className="flex justify-between text-[11px]">
                         <span className="text-foreground/70 font-medium">Active Records</span>
                         <span className="font-mono text-primary font-bold">{csvData.rows.length}</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                         <span className="text-foreground/70 font-medium">Est. Process Time</span>
                         <span className="font-mono text-primary font-bold">{(csvData.rows.length * 0.05).toFixed(1)}s</span>
                      </div>
                      <div className="flex justify-between text-[11px]">
                         <span className="text-foreground/70 font-medium">Mapping Health</span>
                         <span className="font-mono text-primary font-bold">{Math.round((mappedCount / (placeholders.length || 1)) * 100)}%</span>
                      </div>
                   </div>
                </div>
                <div className="border border-border/20 p-4 rounded bg-primary/5 flex flex-col justify-between">
                   <p className="font-mono text-[10px] text-primary/80 uppercase tracking-widest font-bold">Status</p>
                   <div>
                      <p className="text-2xl font-bold tracking-tight text-primary">
                        {mappedCount === placeholders.length && placeholders.length > 0 ? "READY" : "WAITING"}
                      </p>
                      <p className="font-mono text-[9px] text-primary/60 uppercase font-semibold">System Lock</p>
                   </div>
                </div>
              </div>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="px-6 py-4 border-t border-border/20 bg-muted/20 flex items-center justify-between sm:justify-between">
          <Button variant="ghost" className="font-mono text-[11px] tracking-widest uppercase opacity-70 hover:opacity-100" onClick={onClose}>Abort</Button>
          {activeTab === "upload" ? (
            <Button 
              disabled={!csvData.fileName || isParsing}
              onClick={() => setActiveTab("map")}
              className="font-mono text-[11px] tracking-widest uppercase"
            >
              Initialize Architect
              <ChevronRight className="h-3 w-3 ml-2" />
            </Button>
          ) : (
            <Button onClick={onClose} className="font-mono text-[11px] tracking-widest uppercase bg-primary text-black hover:bg-primary/90 font-bold">
              Commit Pipeline
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MappingRow({ placeholder, headers, mapping, sampleValue, onUpdate }) {
  return (
    <div className="grid grid-cols-2 p-3 items-center hover:bg-primary/5 transition-colors group">
      <div className="flex flex-col">
        <span className="font-mono text-[11px] text-primary font-bold">{`{{${placeholder.key}}}`}</span>
      </div>
      <div className="flex flex-col gap-1">
        <select 
          value={mapping || ""}
          onChange={(e) => onUpdate(e.target.value)}
          className="flex h-9 w-full rounded border border-border/30 bg-card px-2 py-1 text-xs font-mono tracking-tight focus:outline-none focus:ring-1 focus:ring-primary/40 text-foreground"
        >
          <option value="">-- SELECT SOURCE --</option>
          {headers.map(header => (
            <option key={header} value={header}>{header}</option>
          ))}
        </select>
        {mapping && (
          <p className="text-[10px] font-mono text-foreground/60 truncate pl-1 font-medium">
            SAMPLE: <span className="text-foreground/80 font-bold">{sampleValue || "NULL"}</span>
          </p>
        )}
      </div>
    </div>
  )
}
