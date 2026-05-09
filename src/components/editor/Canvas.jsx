import { motion } from "framer-motion"

// Mock data for placeholders
const MOCK_PLACEHOLDERS = [
  { id: "1", label: "{{ Name }}", x: 200, y: 300, width: 250, height: 40 },
  { id: "2", label: "{{ Date }}", x: 500, y: 600, width: 150, height: 40 },
  { id: "3", label: "{{ EventName }}", x: 150, y: 400, width: 350, height: 40 },
]

export default function Canvas({ selectedElement, onSelectElement }) {
  return (
    <div 
      className="absolute inset-0 p-10 flex items-center justify-center min-w-max min-h-max"
      onClick={() => onSelectElement(null)}
    >
      {/* Grid Background Pattern */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.1] dark:opacity-[0.05]" 
        style={{
          backgroundImage: `linear-gradient(to right, currentColor 1px, transparent 1px), linear-gradient(to bottom, currentColor 1px, transparent 1px)`,
          backgroundSize: `40px 40px`
        }}
      />

      {/* A4 Document Container */}
      <div 
        className="relative bg-white w-[794px] h-[1123px] shadow-2xl shrink-0 rounded-sm border border-border/10 overflow-hidden"
        onClick={(e) => e.stopPropagation()} // Prevent deselect when clicking document bg
      >
        {/* Mock Template Content */}
        <div className="absolute inset-0 flex flex-col items-center pt-32 text-slate-800 pointer-events-none">
          <h1 className="text-5xl font-serif mb-4">CERTIFICATE</h1>
          <h2 className="text-2xl font-serif text-slate-500 tracking-widest mb-12">OF COMPLETION</h2>
          <p className="text-slate-500 font-medium">This is proudly presented to</p>
          <div className="h-20 w-full" /> {/* Spacer for name */}
          <p className="text-slate-500 font-medium mt-10">For successfully participating in</p>
        </div>

        {/* Placeholders */}
        {MOCK_PLACEHOLDERS.map((ph) => (
          <motion.div
            key={ph.id}
            drag
            dragMomentum={false}
            initial={{ x: ph.x, y: ph.y }}
            className={`absolute flex items-center justify-center border-2 border-dashed rounded-md cursor-grab active:cursor-grabbing
              ${selectedElement === ph.id ? 'border-primary bg-primary/10 z-10' : 'border-primary/40 bg-primary/5 hover:border-primary/60'}
            `}
            style={{ width: ph.width, height: ph.height }}
            onClick={(e) => {
              e.stopPropagation()
              onSelectElement(ph.id)
            }}
          >
            <span className={`font-mono text-sm ${selectedElement === ph.id ? 'text-primary' : 'text-primary/70'}`}>
              {ph.label}
            </span>
            
            {/* Selection Handles (visual only) */}
            {selectedElement === ph.id && (
              <>
                <div className="absolute -top-1.5 -left-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
                <div className="absolute -top-1.5 -right-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
                <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
                <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 bg-white border border-primary rounded-full" />
              </>
            )}
          </motion.div>
        ))}
      </div>
    </div>
  )
}
