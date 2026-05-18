import { motion, AnimatePresence } from "framer-motion"
import { Zap, FileArchive, CheckCircle2, X } from "lucide-react"

/**
 * @param {Object} props
 * @param {boolean} props.isOpen
 * @param {number}  props.current       - How many files are done
 * @param {number}  props.total         - Total files to generate
 * @param {"pdf"|"png"} props.format
 * @param {boolean} props.isZipping     - True when compiling the final ZIP
 * @param {boolean} props.isDone        - True when ZIP has been downloaded
 * @param {() => void} props.onClose    - Only active after done
 */
export default function GenerationProgress({
  isOpen,
  current,
  total,
  format,
  isZipping,
  isDone,
  onClose,
}) {
  const pct = total > 0 ? Math.round((current / total) * 100) : 0

  const statusLabel = isDone
    ? "COMPLETE — ZIP DOWNLOADED"
    : isZipping
    ? "COMPILING ARCHIVE..."
    : `PROCESSING RECORD ${current} / ${total}`

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm"
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.94, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 10 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-6"
          >
            <div
              className="relative w-full max-w-md font-['Space_Grotesk']"
              style={{
                background: "rgba(10,10,10,0.95)",
                border: "1px solid rgba(57,255,20,0.2)",
                backdropFilter: "blur(20px)",
              }}
            >
              {/* Corner marks */}
              <span className="absolute top-0 left-0 w-4 h-4 border-t border-l border-[#39FF14]/50" />
              <span className="absolute top-0 right-0 w-4 h-4 border-t border-r border-[#39FF14]/50" />
              <span className="absolute bottom-0 left-0 w-4 h-4 border-b border-l border-[#39FF14]/50" />
              <span className="absolute bottom-0 right-0 w-4 h-4 border-b border-r border-[#39FF14]/50" />

              {/* Scan line */}
              {!isDone && (
                <motion.div
                  className="absolute left-0 right-0 h-px pointer-events-none"
                  style={{ background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.5), transparent)" }}
                  animate={{ top: ["0%", "100%"] }}
                  transition={{ duration: 2, ease: "linear", repeat: Infinity }}
                />
              )}

              <div className="p-5 sm:p-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-8 h-8 flex items-center justify-center"
                      style={{ border: "1px solid rgba(57,255,20,0.3)", background: "rgba(57,255,20,0.08)" }}
                    >
                      {isDone ? (
                        <CheckCircle2 className="h-4 w-4 text-[#39FF14]" />
                      ) : isZipping ? (
                        <FileArchive className="h-4 w-4 text-[#39FF14]" />
                      ) : (
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                        >
                          <Zap className="h-4 w-4 text-[#39FF14]" />
                        </motion.div>
                      )}
                    </div>
                    <div>
                      <p className="font-mono text-[9px] tracking-[0.2em] text-[#39FF14]/50 uppercase">
                        FLOWMINT — BULK ENGINE
                      </p>
                      <p className="font-mono text-[10px] text-white/60 uppercase tracking-wider">
                        Export as <span className="text-[#39FF14]">{format.toUpperCase()}</span>
                      </p>
                    </div>
                  </div>

                  {isDone && (
                    <button
                      onClick={onClose}
                      className="opacity-40 hover:opacity-100 transition-opacity text-white"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  )}
                </div>

                {/* Big percentage */}
                <div className="mb-6">
                  <motion.p
                    key={pct}
                    initial={{ opacity: 0.4 }}
                    animate={{ opacity: 1 }}
                    className="font-mono font-bold text-[52px] sm:text-[72px] leading-none tracking-tight"
                    style={{ color: isDone ? "#39FF14" : "white" }}
                  >
                    {isDone ? "100" : pct}
                    <span className="text-2xl text-white/30">%</span>
                  </motion.p>
                </div>

                {/* Progress bar */}
                <div className="h-px w-full mb-4 relative overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
                  <motion.div
                    className="absolute top-0 left-0 h-full"
                    style={{ background: "linear-gradient(90deg, rgba(57,255,20,0.5), #39FF14)" }}
                    animate={{ width: isDone ? "100%" : `${pct}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Shimmer */}
                  {!isDone && (
                    <motion.div
                      className="absolute top-0 h-full w-16 pointer-events-none"
                      style={{ background: "linear-gradient(90deg, transparent, rgba(57,255,20,0.6), transparent)" }}
                      animate={{ left: ["-10%", "110%"] }}
                      transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                    />
                  )}
                </div>

                {/* Status */}
                <p className="font-mono text-[10px] tracking-[0.15em] uppercase"
                  style={{ color: isDone ? "rgba(57,255,20,0.8)" : "rgba(255,255,255,0.35)" }}
                >
                  {statusLabel}
                </p>

                {/* Stats row */}
                <div className="grid grid-cols-3 gap-3 mt-6">
                  {[
                    ["FILES", isDone ? total : current],
                    ["TOTAL", total],
                    ["FORMAT", format.toUpperCase()],
                  ].map(([k, v]) => (
                    <div
                      key={k}
                      className="p-3"
                      style={{ border: "1px solid rgba(57,255,20,0.1)", background: "rgba(57,255,20,0.04)" }}
                    >
                      <p className="font-mono text-[8px] text-white/25 uppercase tracking-widest mb-1">{k}</p>
                      <p className="font-mono text-sm font-bold" style={{ color: "#39FF14" }}>{v}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
