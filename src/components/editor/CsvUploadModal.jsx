import { UploadCloud, FileSpreadsheet, CheckCircle2, ChevronRight } from "lucide-react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function CsvUploadModal({ isOpen, onClose }) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px] p-0 overflow-hidden bg-card">
        <DialogHeader className="px-6 pt-6 pb-4 border-b border-border bg-muted/30">
          <DialogTitle className="text-xl">Upload Data Source</DialogTitle>
          <DialogDescription>
            Upload a CSV file to map data to your template placeholders.
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="upload" className="w-full">
          <div className="px-6 border-b border-border bg-muted/10 pt-2">
            <TabsList className="bg-transparent h-auto p-0 space-x-6">
              <TabsTrigger 
                value="upload" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 pt-2 text-sm font-medium"
              >
                1. Upload File
              </TabsTrigger>
              <TabsTrigger 
                value="map" 
                className="data-[state=active]:bg-transparent data-[state=active]:shadow-none data-[state=active]:border-b-2 data-[state=active]:border-primary rounded-none px-0 pb-3 pt-2 text-sm font-medium"
              >
                2. Map Fields
              </TabsTrigger>
            </TabsList>
          </div>

          <div className="p-6">
            <TabsContent value="upload" className="m-0 focus-visible:outline-none">
              <div className="border-2 border-dashed border-border rounded-xl p-10 flex flex-col items-center justify-center text-center bg-muted/10 hover:bg-muted/30 transition-colors cursor-pointer">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                  <UploadCloud className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-medium mb-1">Click or drag CSV file</h3>
                <p className="text-sm text-muted-foreground max-w-xs mb-6">
                  Ensure your first row contains the column headers. Max file size: 10MB.
                </p>
                <Button variant="secondary">Browse Files</Button>
              </div>

              {/* Mock Uploaded State */}
              <div className="mt-6 flex items-center justify-between p-4 border border-border rounded-lg bg-card shadow-sm">
                <div className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded bg-green-500/10 flex items-center justify-center">
                    <FileSpreadsheet className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-medium">attendees_list_v2.csv</h4>
                    <p className="text-xs text-muted-foreground">150 rows • 24 KB</p>
                  </div>
                </div>
                <CheckCircle2 className="h-5 w-5 text-green-500" />
              </div>
            </TabsContent>

            <TabsContent value="map" className="m-0 focus-visible:outline-none space-y-4">
              <div className="bg-muted/50 rounded-lg border border-border overflow-hidden text-sm">
                <div className="grid grid-cols-3 p-3 bg-muted border-b border-border font-medium text-xs text-muted-foreground uppercase tracking-wider">
                  <div>Template Placeholder</div>
                  <div className="col-span-2">CSV Column</div>
                </div>
                
                <div className="divide-y divide-border">
                  <MappingRow placeholder="{{ Name }}" column="Full Name" />
                  <MappingRow placeholder="{{ Date }}" column="Event Date" />
                  <MappingRow placeholder="{{ EventName }}" column="Event Title" />
                </div>
              </div>
              
              <p className="text-xs text-muted-foreground">
                <span className="font-medium text-foreground">3 of 3</span> placeholders mapped. You are ready to generate.
              </p>
            </TabsContent>
          </div>
        </Tabs>

        <DialogFooter className="px-6 py-4 border-t border-border bg-muted/30 flex items-center justify-between sm:justify-between">
          <Button variant="ghost" onClick={onClose}>Cancel</Button>
          <Button>
            Continue to Mapping
            <ChevronRight className="h-4 w-4 ml-2" />
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

function MappingRow({ placeholder, column }) {
  return (
    <div className="grid grid-cols-3 p-3 items-center hover:bg-muted/30 transition-colors">
      <div className="font-mono text-primary/80">{placeholder}</div>
      <div className="col-span-2 flex items-center">
        <select className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm shadow-sm transition-colors">
          <option>{column}</option>
          <option>Email Address</option>
          <option>Organization</option>
          <option>-- Ignore --</option>
        </select>
      </div>
    </div>
  )
}
