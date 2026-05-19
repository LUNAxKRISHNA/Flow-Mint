import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"

const NAV_COLUMNS = [
  {
    label: "Modules",
    links: [
      { text: "FlowGen Workspace", path: "/setup" },
      { text: "Editor", path: "/editor" },
    ],
  },
  {
    label: "Documentation",
    links: [
      { text: "System Docs", path: "/docs" },
      { text: "How it Works", path: "/docs" },
    ],
  },
  {
    label: "Ecosystem",
    links: [
      { text: "Bulk Engine", path: "/docs" },
      { text: "Precision Mapping", path: "/docs" },
    ],
  },
]

export default function Footer() {
  const navigate = useNavigate()

  return (
    <footer className="relative w-full font-['Space_Grotesk'] bg-[#f5f5f3] overflow-hidden">

      {/* Structural top hairline */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#39FF14]/20 to-transparent" />
      <div className="absolute top-[2px] left-0 right-0 h-px bg-[#1a1a1a]/5" />

      {/* Subtle grid background */}
      <div className="absolute inset-0 system-grid-fine opacity-[0.025] pointer-events-none" />

      {/* Ambient glow */}
      <div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[200px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(57,255,20,0.05) 0%, transparent 70%)" }}
      />

      {/* Left edge technical marker */}
      <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between py-4 items-center opacity-20 pointer-events-none">
        <span className="w-1 h-px bg-[#1a1a1a]" />
        <span className="text-[7px] rotate-[-90deg] tracking-[0.2em] font-medium text-[#1a1a1a]">FTR</span>
        <span className="w-1 h-px bg-[#1a1a1a]" />
      </div>

      {/* Right edge technical marker */}
      <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-between py-4 items-center opacity-20 pointer-events-none">
        <span className="w-1 h-px bg-[#1a1a1a]" />
        <span className="text-[7px] rotate-[90deg] tracking-[0.2em] font-medium text-[#1a1a1a]">FTR</span>
        <span className="w-1 h-px bg-[#1a1a1a]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-8 md:px-14 pt-16 pb-8">

        {/* Main grid: brand + nav columns */}
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_1fr_1fr] gap-12 md:gap-8 mb-16">

          {/* Brand column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Logo */}
            <div
              className="relative w-28 h-10 flex items-center justify-center cursor-pointer group"
              onClick={() => navigate("/")}
            >
              <img
                src="/logo.png"
                alt="FlowMint Logo"
                className="w-full h-full object-contain filter grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500"
              />
            </div>

            {/* Tagline */}
            <p className="text-[12px] leading-relaxed text-[#1a1a1a]/50 max-w-xs">
              High-fidelity asynchronous document mapping and bulk generation engine.
            </p>

            {/* Status badge */}
            <div className="flex items-center gap-2.5">
              <span className="status-pulse" />
              <span className="font-mono text-[9px] tracking-[0.2em] text-[#1a1a1a]/40 uppercase">
                System Status: Nominal
              </span>
            </div>
          </motion.div>

          {/* Navigation columns */}
          {NAV_COLUMNS.map((col, colIdx) => (
            <motion.div
              key={col.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 + colIdx * 0.07 }}
              className="flex flex-col gap-4"
            >
              {/* Column label */}
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-[#39FF14]/60">
                {col.label}
              </span>

              {/* Thin divider */}
              <div className="h-px w-full bg-[#1a1a1a]/8" />

              {/* Links */}
              <ul className="flex flex-col gap-3">
                {col.links.map((link, linkIdx) => (
                  <li key={link.text}>
                    <button
                      onClick={() => navigate(link.path)}
                      className="group flex items-center gap-2 text-left text-[12px] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-colors duration-200"
                    >
                      <span className="font-mono text-[8px] text-[#1a1a1a]/20 group-hover:text-[#39FF14] transition-colors tabular-nums">
                        {String(linkIdx + 1).padStart(2, "0")}
                      </span>
                      {link.text}
                    </button>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        {/* Bottom divider */}
        <div className="h-px w-full bg-gradient-to-r from-transparent via-[#1a1a1a]/10 to-transparent mb-8" />

        {/* Bottom bar: copyright + technical readouts */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          {/* Copyright */}
          <span className="font-mono text-[9px] tracking-[0.15em] uppercase text-[#1a1a1a]/25">
            © {new Date().getFullYear()} FlowMint Ecosystem — Modular Tools for Creative Workflows
          </span>

          {/* Technical readouts */}
          <div className="flex items-center gap-6">
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-[#1a1a1a]/20">
              Latency: &lt;2ms
            </span>
            <div className="w-px h-3 bg-[#1a1a1a]/10" />
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-[#1a1a1a]/20">
              Matrix v1.0.4
            </span>
            <div className="w-px h-3 bg-[#1a1a1a]/10" />
            <span className="font-mono text-[8px] tracking-[0.15em] uppercase text-[#39FF14]/40">
              Engine: Active
            </span>
          </div>
        </div>

        {/* Corner accent markers */}
        <span className="absolute bottom-0 left-8 w-4 h-4 border-b border-l border-[#39FF14]/15 pointer-events-none" />
        <span className="absolute bottom-0 right-8 w-4 h-4 border-b border-r border-[#39FF14]/15 pointer-events-none" />
      </div>
    </footer>
  )
}
