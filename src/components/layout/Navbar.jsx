import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion"

export default function Navbar() {
  const navigate = useNavigate()
  const { scrollY } = useScroll()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  // Navbar subtle background opacity based on scroll
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1])
  const borderColor = useTransform(scrollY, [0, 100], ["rgba(26,26,26,0)", "rgba(26,26,26,0.08)"])

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })
    setMobileMenuOpen(false)
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

        {/* LEFT SIDE: Workspace, Templates (Desktop) */}
        <div className="hidden md:flex items-center gap-10 w-1/3 pl-4">
          <button
            onClick={() => navigate("/setup")}
            className="group flex items-center gap-2 opacity-60 hover:opacity-100 transition-opacity"
          >
            <span className="text-[9px] font-mono tracking-widest text-[#1a1a1a]/50 group-hover:text-[#39FF14] transition-colors">01</span>
            <span className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a] uppercase">FlowGen</span>
          </button>
        </div>

        {/* LEFT SIDE: Hamburger Menu (Mobile) */}
        <div className="flex md:hidden items-center w-1/3 pl-2">
          <button
            onClick={() => setMobileMenuOpen(true)}
            className="w-10 h-10 flex flex-col items-center justify-center gap-[4px] group"
          >
            <span className="w-5 h-[1px] bg-[#1a1a1a] group-hover:bg-[#39FF14] transition-colors" />
            <span className="w-5 h-[1px] bg-[#1a1a1a] group-hover:bg-[#39FF14] transition-colors" />
            <span className="w-5 h-[1px] bg-[#1a1a1a] group-hover:bg-[#39FF14] transition-colors" />
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


        {/* RIGHT SIDE: Docs (Desktop) */}
        <div className="hidden md:flex items-center justify-end gap-10 w-1/3 pr-4">
          <button
            onClick={() => navigate("/docs")}
            className="text-[11px] font-medium tracking-[0.15em] text-[#1a1a1a]/50 hover:text-[#1a1a1a] transition-all duration-300 uppercase relative overflow-hidden group"
          >
            Docs
            <span className="absolute bottom-0 left-0 w-full h-[1px] bg-[#39FF14] -translate-x-[105%] group-hover:translate-x-0 transition-transform duration-300 ease-out" />
          </button>
        </div>


        {/* Tiny technical markers embedded into navbar edges (Right) */}
        <div className="absolute right-0 top-0 bottom-0 w-6 flex flex-col justify-between py-2 items-center opacity-30 pointer-events-none">
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
          <span className="text-[7px] rotate-[90deg] tracking-[0.2em] font-medium text-[#1a1a1a]">NAV</span>
          <span className="w-1 h-[1px] bg-[#1a1a1a]" />
        </div>

      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="absolute top-16 left-0 w-full bg-[#f5f5f3]/95 backdrop-blur-md border-b border-[#1a1a1a]/10 pointer-events-auto md:hidden"
          >
            <div className="flex flex-col px-6 py-8 gap-6">
              <button
                onClick={() => { navigate("/setup"); setMobileMenuOpen(false); }}
                className="flex items-center justify-between py-2 border-b border-[#1a1a1a]/5"
              >
                <span className="text-[14px] font-medium tracking-[0.15em] text-[#1a1a1a] uppercase">FlowGen</span>
                <span className="text-[9px] font-mono text-[#1a1a1a]/40">01</span>
              </button>
              <button
                onClick={() => { navigate("/docs"); setMobileMenuOpen(false); }}
                className="flex items-center justify-between py-2 border-b border-[#1a1a1a]/5"
              >
                <span className="text-[14px] font-medium tracking-[0.15em] text-[#1a1a1a] uppercase">Docs</span>
                <span className="text-[9px] font-mono text-[#1a1a1a]/40">02</span>
              </button>
            </div>
            {/* Close button in mobile menu */}
            <div className="absolute top-[-3rem] left-0 w-full h-16 flex items-center justify-start px-8 pointer-events-none">
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="pointer-events-auto w-10 h-10 flex flex-col items-center justify-center gap-[4px]"
              >
                {/* X icon */}
                <span className="w-5 h-[1px] bg-[#1a1a1a] rotate-45 translate-y-[2.5px]" />
                <span className="w-5 h-[1px] bg-[#1a1a1a] -rotate-45 -translate-y-[2.5px]" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}
