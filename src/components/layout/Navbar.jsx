import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform } from "framer-motion"

export default function Navbar() {
  const navigate = useNavigate()
  const { scrollY } = useScroll()

  // Navbar subtle background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(26,26,26,0)", "rgba(26,26,26,0.08)"])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 w-full z-50 pointer-events-none font-['Space_Grotesk']">
      {/* Background layer */}
      <motion.div
        className="absolute inset-0 bg-[#f5f5f3]/80 backdrop-blur-[4px] pointer-events-auto"
        style={{ opacity: bgOpacity }}
      />

      {/* Thin horizontal structural divider lines extending across screen */}
      <motion.div
        className="absolute bottom-0 left-0 w-full h-[1px]"
        style={{ backgroundColor: borderColor }}
      />
      <div className="absolute bottom-[2px] left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#39FF14]/10 to-transparent opacity-50" />

      {/* Soft grid overlays behind navbar */}
      <div className="absolute inset-0 system-grid-fine opacity-20 pointer-events-none mix-blend-multiply" />

      {/* Main Content Container */}
      <div className="relative h-16 flex items-center justify-between px-6 md:px-12 mx-auto w-full pointer-events-auto">

        {/* Tiny technical markers embedded into navbar edges (Left) */}
        <div className="absolute left-0 top-0 bottom-0 w-6 flex flex-col justify-between py-2 items-center opacity-30 pointer-events-none">
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
          <span className="text-[7px] rotate-[-90deg] tracking-[0.2em] font-medium text-[#1a1a1a]">NAV</span>
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
        </div>

        {/* LEFT SIDE: Workspace, Templates */}
        <div className="flex items-center gap-10 w-1/3 pl-4">
          <button
            onClick={() => navigate("/setup")}
            className="group flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 group-hover:text-[#39FF14] transition-colors">01</span>
            <span className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a] uppercase">Workspace</span>
          </button>
          <button
            onClick={() => scrollTo("templates")}
            className="group flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 group-hover:text-[#39FF14] transition-colors">02</span>
            <span className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a] uppercase">Templates</span>
          </button>
        </div>

        {/* CENTER: Logo Glyph */}
        <div className="flex justify-center w-1/3 group">
          <div
            className="relative flex items-center justify-center cursor-pointer"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          >
            {/* Logo */}
            <div className="relative w-36 h-18 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="FlowMint Logo"
                className="w-full h-full object-contain filter grayscale brightness-50 group-hover:grayscale-0 group-hover:brightness-100 transition-all duration-500 animate-logo-smooth group-hover:animation-none"
              />
            </div>
          </div>
        </div>


        {/* RIGHT SIDE: Generate, Docs, Icon */}
        <div className="flex items-center justify-end gap-10 w-1/3 pr-4">
          <button
            className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all duration-300 uppercase relative overflow-hidden group"
          >
            Generate
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#39FF14] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
          <button
            className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all duration-300 uppercase relative overflow-hidden group"
          >
            Docs
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#39FF14] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>

          {/* Tiny outlined square control icon with neon green plus */}
          <button className="relative w-7 h-7 border border-[#1a1a1a]/15 flex items-center justify-center hover:border-[#39FF14]/60 hover:bg-[#39FF14]/5 transition-all duration-300 group ml-2">
            {/* Neon green plus */}
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="transform group-hover:scale-110 transition-transform duration-300">
              <path d="M5 1v8M1 5h8" stroke="#39FF14" strokeWidth="1" strokeLinecap="square" />
            </svg>
            {/* Micro hover glow */}
            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[#39FF14]/10 blur-[4px] pointer-events-none" />
            {/* Tiny coordinate marker */}
            <span className="absolute -top-3 -right-4 text-[6px] font-mono text-[#39FF14]/0 group-hover:text-[#39FF14]/60 transition-colors duration-300">ACT.01</span>
          </button>
        </div>

        {/* Tiny technical markers embedded into navbar edges (Right) */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-between py-2 items-center opacity-30 pointer-events-none">
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
          <span className="text-[7px] rotate-[90deg] tracking-[0.2em] font-medium text-[#1a1a1a]">NAV</span>
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
        </div>

      </div>
    </nav>
  )
}
