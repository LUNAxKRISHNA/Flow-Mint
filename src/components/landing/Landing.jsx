import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { BlueprintReveal, SectionReveal, ItemReveal, StaggerContainer, StaggerItem } from "./ScrollReveal";

// --- SplashSection.jsx ---
export function SplashSection() {
  const navigate = useNavigate()
  const scrollToNext = () => {
    document.getElementById("hero")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden system-grid bg-background">
      {/* Decorative Curved SVG Lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20" viewBox="0 0 1440 900" fill="none" preserveAspectRatio="xMidYMid slice">
        <path d="M -100 200 C 300 200 400 800 800 800 C 1200 800 1300 100 1600 100" stroke="var(--foreground)" strokeWidth="1" />
        <path d="M 200 -100 C 200 300 1000 400 1000 800 C 1000 1200 1200 1300 1200 1600" stroke="var(--foreground)" strokeWidth="1" />
        <path d="M -50 600 C 400 500 600 100 1000 -50" stroke="var(--foreground)" strokeWidth="0.5" />
      </svg>

      {/* Grid lines crosshairs */}
      <div className="absolute top-0 bottom-0 left-1/3 w-px bg-border/20 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-1/3 w-px bg-border/20 pointer-events-none" />
      <div className="absolute left-0 right-0 top-1/3 h-px bg-border/20 pointer-events-none" />
      <div className="absolute left-0 right-0 bottom-1/3 h-px bg-border/20 pointer-events-none" />

      {/* Edge Squares */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-border/40" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-border/40" />
      <div className="absolute left-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border/40" />
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 bg-border/40" />

      {/* Corner Texts */}
      <div className="absolute bottom-6 left-8">
        <span className="mono-label text-foreground/40 tracking-[0.2em]">.-.. ..- -. .-</span>
      </div>
      <div className="absolute bottom-6 right-8 flex flex-col items-end gap-1">
        <span className="mono-label text-foreground/40 tracking-[0.2em]">FLOW_MINT // 2026</span>
      </div>

      {/* Enter Workspace Link */}
      <div className="absolute bottom-20 right-12 z-20">
        <button
          onClick={() => navigate("/editor")}
          className="group flex flex-col items-end gap-1"
        >
          <div className="flex items-center gap-2 text-foreground/80 hover:text-foreground transition-colors font-medium">
            <span>Enter Workspace</span>
            <svg width="12" height="12" viewBox="0 0 12 12" fill="none" className="group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-transform">
              <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <div className="h-px w-full bg-primary/40 group-hover:bg-primary transition-colors shadow-[0_0_8px_#39FF14]" />
        </button>
      </div>

      {/* Decorative Dot Matrix Top Left */}
      <div className="absolute top-32 left-32 grid-cols-6 gap-3 opacity-20 pointer-events-none hidden md:grid">
        {[...Array(24)].map((_, i) => (
          <div key={i} className="w-1 h-1 rounded-full bg-foreground" />
        ))}
      </div>

      {/* Main Center Content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo container */}
        <div className="relative group">
          {/* Localized Scanning Effect specifically for the logo area */}
          <div className="absolute inset-x-[-20%] h-[2px] bg-primary/30 blur-[2px] z-20 pointer-events-none animate-[scanPulse_4s_ease-in-out_infinite]" />

          {/* Background blurred outline text effect based on the reference */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-[8rem] md:text-[14rem] font-bold text-transparent opacity-[0.03] pointer-events-none select-none tracking-tighter"
            style={{ WebkitTextStroke: "2px var(--foreground)" }}>
            FlowMint
          </div>

          {/* SVG Filter for precise offset stroke */}
          <svg width="0" height="0" className="absolute">
            <filter id="offset-stroke" x="-20%" y="-20%" width="140%" height="140%">
              <feMorphology in="SourceAlpha" operator="dilate" radius="4" result="OUTER" />
              <feMorphology in="SourceAlpha" operator="dilate" radius="3" result="INNER" />
              <feComposite in="OUTER" in2="INNER" operator="out" result="STROKE" />

              {/* Static base stroke */}
              <feFlood floodColor="var(--foreground)" floodOpacity="0.15" result="BASE_COLOR" />
              <feComposite in="BASE_COLOR" in2="STROKE" operator="in" result="BASE_STROKE" />

              {/* Add a subtle glow/shine to the stroke that feels like it reacts to scanning */}
              <feGaussianBlur in="STROKE" stdDeviation="1" result="STROKE_BLUR" />
              <feFlood floodColor="#39FF14" floodOpacity="0.1" result="GLOW_COLOR" />
              <feComposite in="GLOW_COLOR" in2="STROKE_BLUR" operator="in" result="STROKE_GLOW" />

              <feMerge>
                <feMergeNode in="BASE_STROKE" />
                <feMergeNode in="STROKE_GLOW" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </svg>

          <img
            src="/logo.png"
            alt="FlowMint Logo"
            className="relative h-20 md:h-32 lg:h-40 w-auto object-contain z-10"
            style={{
              filter: "url(#offset-stroke)"
            }}
          />
        </div>

        <p className="mt-8 text-foreground/70 text-lg md:text-xl tracking-wide font-medium relative z-10">
          <i>Intelligent Workflow Orchestration</i> <span className="text-foreground/40">(Beta 0.1)</span>
        </p>
      </div>

      {/* Scroll indicator (optional, at bottom center) */}
      <button
        onClick={scrollToNext}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 opacity-50 hover:opacity-100 transition-opacity flex flex-col items-center gap-2"
      >
        <span className="w-px h-12 bg-gradient-to-b from-transparent via-foreground/50 to-transparent" />
      </button>
    </section>
  )
}

// --- HeroSection.jsx ---
export function HeroSection() {
  const navigate = useNavigate()

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden system-grid-dark bg-foreground">
      {/* Background glow blob */}
      <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-primary/10 blur-[120px] rounded-full pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-primary/5 blur-[80px] rounded-full pointer-events-none" />

      {/* Scanning line */}
      <div className="scan-line" />

      {/* Corner coord markers */}
      <span className="absolute bottom-8 left-6 coord-label" style={{ color: "rgba(57,255,20,0.3)" }}>.-.. ..- -. .-</span>
      <span className="absolute bottom-8 right-6 coord-label" style={{ color: "rgba(57,255,20,0.3)" }}>LATENCY: &lt;2ms</span>

      <div className="w-full max-w-[1400px] mx-auto px-8 pt-28 pb-16 grid grid-cols-1 lg:grid-cols-[1fr_1px_1fr] gap-0 items-center">

        {/* ── Left: Editorial Typography ─────────────────────────── */}
        <div className="pr-0 lg:pr-16 py-8">
          {/* Giant editorial heading — fragmented layout */}
          <div className="mb-8">
            <div className="overflow-hidden">
              <motion.h1
                className="editorial-heading text-[72px] md:text-[96px] lg:text-[108px] text-white leading-none"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                DOCUMENT
              </motion.h1>
            </div>
            <div className="overflow-hidden pl-8 md:pl-16">
              <motion.h1
                className="editorial-heading text-[72px] md:text-[96px] lg:text-[108px] text-white leading-none"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.22 }}
              >
                AUTO<span style={{ color: "#39FF14" }}>MATION</span>
              </motion.h1>
            </div>
            <div className="overflow-hidden">
              <motion.h1
                className="editorial-heading text-[72px] md:text-[96px] lg:text-[108px] text-foreground/20 leading-none"
                initial={{ y: "110%", opacity: 0 }}
                animate={{ y: "0%", opacity: 1 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.34 }}
              >
                REIMAGINED.
              </motion.h1>
            </div>
          </div>

          {/* Sub-tagline */}
          <motion.p
            className="text-base text-white/40 max-w-sm leading-relaxed mb-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.5 }}
          >
            Upload templates, map spreadsheet data, and generate hundreds of personalized documents in seconds.
          </motion.p>

          {/* CTA row */}
          <motion.div
            className="flex items-center gap-4"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.62 }}
          >
            <button
              onClick={() => navigate("/editor")}
              className="group flex items-center gap-2 px-6 py-3 bg-white text-black text-sm font-semibold rounded-sm hover:bg-primary hover:text-black transition-all duration-200 animate-glow-pulse"
            >
              <span>Initialize Workspace</span>
            </button>
          </motion.div>
        </div>

        {/* ── Vertical Divider ───────────────────────────────────── */}
        <div className="hidden lg:block hairline-v self-stretch mx-0" style={{ background: "linear-gradient(180deg, transparent 0%, rgba(57,255,20,0.15) 20%, rgba(57,255,20,0.15) 80%, transparent 100%)" }} />

        {/* ── Right: Workflow Visualization ─────────────────────── */}
        <motion.div
          className="relative pl-0 lg:pl-16 py-8 flex items-center justify-center"
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.4 }}
        >
          <HeroVisualization />
        </motion.div>
      </div>

      {/* Bottom hairline */}
      <div className="absolute bottom-0 left-0 right-0 hairline" style={{ background: "rgba(57,255,20,0.15)" }} />
    </section>
  )
}

function HeroVisualization() {
  return (
    <div className="relative w-full max-w-[480px] h-[520px]">

      {/* Background grid panel */}
      <div className="absolute inset-0 system-grid-dark rounded-sm border border-white/5" />

      {/* Node: Template */}
      <div className="absolute top-12 left-0 animate-node-float" style={{ animationDelay: "0s" }}>
        <div className="sys-node corner-marks rounded-sm px-4 py-3 w-52 bg-zinc-900/60 border-white/5 backdrop-blur-xl hover:border-primary/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-primary rounded-full" />
            <span className="mono-label text-white/40">TEMPLATE</span>
          </div>
          <p className="text-sm font-semibold text-white">certificate.png</p>
          <div className="mt-2 space-y-1">
            {["{{name}}", "{{date}}", "{{score}}"].map(p => (
              <div key={p} className="text-xs font-mono text-primary/70 bg-primary/5 px-2 py-0.5 rounded-sm border border-primary/15">{p}</div>
            ))}
          </div>
          <span className="absolute -bottom-4 left-2 coord-label" style={{ color: "rgba(57,255,20,0.2)" }}>[LAYER 0]</span>
        </div>
      </div>

      {/* Node: Data Source */}
      <div className="absolute top-4 right-0 animate-node-float-alt" style={{ animationDelay: "0.5s" }}>
        <div className="sys-node corner-marks rounded-sm px-4 py-3 w-44 bg-zinc-900/60 border-white/5 backdrop-blur-xl hover:border-primary/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full" />
            <span className="mono-label text-white/40">DATA</span>
          </div>
          <p className="text-sm font-semibold text-white">students.csv</p>
          <div className="mt-2 space-y-1">
            {[["Name", "Alice"], ["Date", "2026-05"], ["Score", "98.4"]].map(([k, v]) => (
              <div key={k} className="flex justify-between text-xs">
                <span className="text-white/40">{k}</span>
                <span className="font-medium text-white/70">{v}</span>
              </div>
            ))}
          </div>
          <div className="mt-2 text-xs text-white/20">+147 rows</div>
        </div>
      </div>

      {/* Node: Mapping Engine */}
      <div className="absolute top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 animate-node-float" style={{ animationDelay: "1s" }}>
        <div className="sys-node corner-marks rounded-sm px-5 py-4 w-48 text-center bg-zinc-900/60 border-primary/20 backdrop-blur-xl hover:border-primary/50 transition-all" style={{ borderColor: "rgba(57,255,20,0.3)" }}>
          <div className="flex items-center justify-center gap-2 mb-2">
            <span className="status-pulse" />
            <span className="mono-label text-primary/70">MAPPING ENGINE</span>
          </div>
          <p className="text-xs text-white/50">Processing fields…</p>
          <div className="mt-3 h-1.5 bg-white/10 rounded-full overflow-hidden">
            <div className="h-full bg-primary rounded-full w-3/4 animate-glow-pulse" />
          </div>
          <p className="text-xs text-white/40 mt-1">3 / 4 mapped</p>
        </div>
      </div>

      {/* Node: Output */}
      <div className="absolute bottom-9 right-[-30px] animate-node-float-alt" style={{ animationDelay: "0.8s" }}>
        <div className="sys-node corner-marks rounded-sm px-4 py-3 w-44 bg-zinc-900/60 border-white/5 backdrop-blur-xl hover:border-primary/30 transition-all">
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-orange-400 rounded-full" />
            <span className="mono-label text-white/40">OUTPUT</span>
          </div>
          <p className="text-sm font-semibold text-white">148 PDFs</p>
          <p className="text-xs text-white/40 mt-1">Generated in 1.2s</p>
          <div className="mt-2 flex gap-1">
            {[...Array(5)].map((_, i) => (
              <div key={i} className="flex-1 h-1 bg-primary/30 rounded-full" />
            ))}
          </div>
        </div>
      </div>

      {/* Node: Status indicator bottom left */}
      <div className="absolute bottom-10 left-0 animate-node-float" style={{ animationDelay: "1.5s" }}>
        <div className="sys-node rounded-sm px-3 py-2 text-xs bg-zinc-900/60 border-white/5 backdrop-blur-xl hover:border-primary/30 transition-all">
          <span className="mono-label text-white/40">QUEUE:</span>
          <span className="text-white/70 ml-2">148 jobs done</span>
        </div>
      </div>

      {/* SVG Connection lines */}
      <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 480 520" fill="none">
        {/* Template → Engine */}
        <path d="M 200 90 Q 240 90 240 240" stroke="rgba(57,255,20,0.35)" strokeWidth="1" className="flow-path" />
        {/* Data → Engine */}
        <path d="M 290 110 Q 290 200 280 240" stroke="rgba(57,255,20,0.25)" strokeWidth="1" className="flow-path" />
        {/* Engine → Output */}
        <path d="M 280 280 Q 340 300 340 380" stroke="rgba(57,255,20,0.35)" strokeWidth="1" className="flow-path" />
        {/* Decorative lines */}
        <line x1="0" y1="480" x2="480" y2="480" stroke="rgba(26,26,26,0.06)" strokeWidth="1" />
        <line x1="0" y1="40" x2="480" y2="40" stroke="rgba(26,26,26,0.06)" strokeWidth="1" />
        {/* Arrowhead at output */}
        <polygon points="342,375 339,370 345,370" fill="rgba(57,255,20,0.5)" />
      </svg>

      {/* Corner coordinate labels */}
      <span className="absolute top-2 left-2 coord-label" style={{ color: "rgba(57,255,20,0.2)" }}>[0,0]</span>
      <span className="absolute top-2 right-2 coord-label" style={{ color: "rgba(57,255,20,0.2)" }}>[480,0]</span>
      <span className="absolute bottom-2 left-2 coord-label" style={{ color: "rgba(57,255,20,0.2)" }}>[0,520]</span>
      <span className="absolute bottom-2 right-2 coord-label" style={{ color: "rgba(57,255,20,0.2)" }}>[480,520]</span>
    </div>
  )
}

// --- WorkflowSection.jsx ---
const WORKFLOW_NODES = [
  {
    id: "upload",
    label: "01 — UPLOAD TEMPLATE",
    title: "Template Ingestion",
    desc: "Drop in your png  template.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="3" y="3" width="14" height="14" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M10 7v6M7 10l3-3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    coord: "[X:01 / Y:01]",
    meta: "FORMAT: .PNG",
    col: 1, row: 1,
  },
  {
    id: "placeholder",
    label: "02 — ADD PLACEHOLDERS",
    title: "Variable Mapping",
    desc: "Insert {{variable}} tokens visually into the document canvas with precision placement.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 10h10M8 7l-3 3 3 3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
        <rect x="2" y="4" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    coord: "[X:02 / Y:01]",
    meta: "ENGINE: REGEX+AST",
    col: 2, row: 1,
  },
  {
    id: "spreadsheet",
    label: "03 — MAP SPREADSHEET",
    title: "Data Binding",
    desc: "Upload your CSV. Drag columns to match placeholder variables automatically.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <rect x="2" y="4" width="16" height="12" rx="1" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 8h16M8 4v12" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    coord: "[X:02 / Y:02]",
    meta: "INPUT: CSV / XLSX",
    col: 2, row: 2,
  },
  {
    id: "generate",
    label: "04 — GENERATE DOCS",
    title: "Batch Rendering",
    desc: "Fire the engine. Hundreds of personalized PDFs rendered in seconds.",
    icon: (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
        <path d="M5 10l3 3 7-7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="10" cy="10" r="8" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
    coord: "[X:01 / Y:02]",
    meta: "OUTPUT: PDF / DOCX",
    col: 1, row: 2,
  },
]

export function WorkflowSection() {
  return (
    <section id="workflow" className="relative py-32 overflow-hidden">
      {/* Subtle background */}
      <div className="absolute inset-0 system-grid-fine" />
      <div className="absolute top-0 left-0 right-0 hairline" />
      <div className="absolute bottom-0 left-0 right-0 hairline" />

      {/* Top label */}
      <BlueprintReveal className="relative max-w-[1400px] mx-auto px-8 mb-16" delay={0}>
        <div className="flex items-end justify-between">
          <div>
            <span className="mono-label text-foreground/30 block mb-3">§ 02 — WORKFLOW ARCHITECTURE</span>
            <h2 className="editorial-heading text-[52px] md:text-[72px] leading-none text-foreground">
              WORKFLOW<br />
              <span style={{ color: "#39FF14" }}>AS ART.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="mono-label text-foreground/25 block mt-1">4 STAGES / 0 ERRORS</span>
          </div>
        </div>
        <div className="hairline mt-8" />
      </BlueprintReveal>

      {/* Pipeline grid */}
      <div className="relative max-w-[1400px] mx-auto px-8">
        <div className="grid grid-cols-1 xl:grid-cols-[auto_1px_380px] gap-12 items-stretch">

          {/* Left: Workflow Grid */}
          <div className="relative max-w-3xl">
            <StaggerContainer className="grid grid-cols-2 gap-6 md:gap-10 relative z-10" delay={0.15} stagger={0.12}>
              {/* Row 1 */}
              <StaggerItem><WorkflowNode node={WORKFLOW_NODES[0]} delay="0s" /></StaggerItem>
              <StaggerItem><WorkflowNode node={WORKFLOW_NODES[1]} delay="0s" /></StaggerItem>
              {/* Row 2 — reversed for flow effect */}
              <StaggerItem><WorkflowNode node={WORKFLOW_NODES[3]} delay="0s" /></StaggerItem>
              <StaggerItem><WorkflowNode node={WORKFLOW_NODES[2]} delay="0s" /></StaggerItem>
            </StaggerContainer>

            {/* SVG Flow Paths (layered over grid) */}
            <svg
              className="absolute inset-0 pointer-events-none w-full h-full"
              viewBox="0 0 720 440"
              fill="none"
            >
              {/* Upload → Placeholder (horizontal top) */}
              <path d="M 345 105 L 375 105" stroke="rgba(57,255,20,0.4)" strokeWidth="1.2" className="flow-path" markerEnd="url(#arrow)" />
              {/* Placeholder → Spreadsheet (vertical right) */}
              <path d="M 540 205 L 540 235" stroke="rgba(57,255,20,0.4)" strokeWidth="1.2" className="flow-path" markerEnd="url(#arrow)" />
              {/* Spreadsheet → Generate (horizontal bottom) */}
              <path d="M 375 340 L 345 340" stroke="rgba(57,255,20,0.4)" strokeWidth="1.2" className="flow-path" markerEnd="url(#arrow)" />
              {/* Generate → (loop back up, decorative) */}
              <path d="M 180 235 L 180 205" stroke="rgba(57,255,20,0.15)" strokeWidth="1" strokeDasharray="4 6" />

              <defs>
                <marker id="arrow" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto">
                  <path d="M0,0 L0,6 L6,3 z" fill="rgba(57,255,20,0.6)" />
                </marker>
              </defs>
            </svg>
          </div>

          {/* Vertical Divider */}
          <div className="hidden xl:block hairline-v" />

          {/* Right: Technical Panel */}
          <ItemReveal className="hidden xl:block" direction="left" delay={0.3}>
            <WorkflowDiagnostics />
          </ItemReveal>

        </div>
      </div>
    </section>
  )
}

function WorkflowNode({ node, delay }) {
  return (
    <div
      className="relative sys-node corner-marks rounded-sm p-6 group bg-white/80"
      style={{ animationDelay: delay }}
    >
      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div className="text-primary/70 group-hover:text-primary transition-colors">
          {node.icon}
        </div>
        <span className="coord-label">{node.coord}</span>
      </div>

      {/* Label */}
      <span className="mono-label text-primary/50 block mb-2">{node.label}</span>

      {/* Title */}
      <h3 className="text-lg font-bold text-foreground mb-2 leading-tight">{node.title}</h3>

      {/* Description */}
      <p className="text-sm text-foreground/50 leading-relaxed">{node.desc}</p>

      {/* Bottom meta */}
      <div className="mt-4 pt-4 border-t border-border/10">
        <span className="meta-label">{node.meta}</span>
      </div>

      {/* Hover glow overlay */}
      <div className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
        style={{ background: "radial-gradient(circle at 20% 20%, rgba(57,255,20,0.04) 0%, transparent 70%)" }}
      />
    </div>
  )
}

// --- EditorPreviewSection.jsx ---
export function EditorPreviewSection() {
  return (
    <section id="editor-preview" className="relative py-32 overflow-hidden bg-foreground">
      {/* Dark grid background */}
      <div className="absolute inset-0 system-grid-dark" />
      {/* Glow blob */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(57,255,20,0.08) 0%, transparent 70%)" }}
      />
      <div className="absolute top-0 left-0 right-0" style={{ height: 1, background: "rgba(57,255,20,0.15)" }} />
      <div className="absolute bottom-0 left-0 right-0" style={{ height: 1, background: "rgba(57,255,20,0.15)" }} />

      {/* Scan line on dark bg */}
      <div className="absolute left-0 right-0 pointer-events-none"
        style={{ height: 1, background: "linear-gradient(90deg, transparent 0%, rgba(57,255,20,0.25) 50%, transparent 100%)", animation: "scanPulse 6s ease-in-out infinite" }}
      />

      {/* Corner labels */}
      <span className="absolute top-8 left-8 coord-label" style={{ color: "rgba(57,255,20,0.3)" }}>[§ 03 — EDITOR]</span>
      <span className="absolute top-8 right-8 coord-label" style={{ color: "rgba(57,255,20,0.3)" }}>[WORKSPACE v2.1]</span>

      <div className="relative max-w-[1400px] mx-auto px-8">
        {/* Section heading */}
        <BlueprintReveal className="mb-14" delay={0}>
          <h2 className="editorial-heading text-[52px] md:text-[72px] leading-none text-white">
            FUTURISTIC<br />
            <span style={{ color: "#39FF14" }}>WORKSPACE.</span>
          </h2>
          <p className="text-sm mt-4 max-w-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.35)" }}>
            Precision placement. Every pixel deliberate. A canvas engineered for creative control.
          </p>
        </BlueprintReveal>

        {/* Editor UI mockup */}
        <SectionReveal delay={0.3}>
        <div className="relative rounded-sm overflow-hidden border" style={{ borderColor: "rgba(57,255,20,0.15)", background: "rgba(255,255,255,0.03)", backdropFilter: "blur(4px)" }}>

          {/* Editor top bar */}
          <div className="flex items-center justify-between px-5 py-3 border-b" style={{ borderColor: "rgba(57,255,20,0.1)", background: "rgba(255,255,255,0.04)" }}>
            <div className="flex items-center gap-3">
              <div className="flex gap-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(255,255,255,0.15)" }} />
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: "rgba(57,255,20,0.4)" }} />
              </div>
              <span className="mono-label" style={{ color: "rgba(255,255,255,0.3)" }}>FLOWMINT EDITOR — certificate.docx</span>
            </div>
            <div className="flex items-center gap-4">
              <span className="mono-label" style={{ color: "rgba(57,255,20,0.5)" }}>● LIVE</span>
              <span className="mono-label" style={{ color: "rgba(255,255,255,0.2)" }}>SAVE  GENERATE</span>
            </div>
          </div>

          {/* Editor body */}
          <div className="flex" style={{ minHeight: 420 }}>

            {/* Left: Layer panel */}
            <div className="w-48 border-r flex-shrink-0 px-4 py-4" style={{ borderColor: "rgba(57,255,20,0.08)", background: "rgba(0,0,0,0.2)" }}>
              <span className="mono-label block mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>LAYERS</span>
              {[
                { label: "{{name}}", active: true },
                { label: "{{date}}", active: false },
                { label: "Logo Asset", active: false },
                { label: "{{score}}", active: false },
                { label: "Background", active: false },
              ].map((layer, i) => (
                <div key={i} className="flex items-center gap-2 px-2 py-1.5 rounded-sm mb-1"
                  style={{ background: layer.active ? "rgba(57,255,20,0.08)" : "transparent", borderLeft: layer.active ? "2px solid #39FF14" : "2px solid transparent" }}>
                  <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: layer.active ? "#39FF14" : "rgba(255,255,255,0.15)" }} />
                  <span className="text-xs" style={{ color: layer.active ? "rgba(57,255,20,0.9)" : "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk" }}>{layer.label}</span>
                </div>
              ))}
            </div>

            {/* Center: Canvas */}
            <div className="flex-1 flex items-center justify-center p-8 relative" style={{ background: "rgba(0,0,0,0.1)" }}>
              {/* Alignment grid */}
              <div className="absolute inset-0 system-grid-dark" />

              {/* A4 document mock */}
              <div className="relative shadow-2xl" style={{ width: 260, height: 360, background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 2 }}>
                {/* Document header */}
                <div className="absolute top-8 left-8 right-8">
                  <div style={{ height: 2, background: "#39FF14", marginBottom: 8, opacity: 0.6 }} />
                  <div style={{ height: 8, background: "rgba(255,255,255,0.12)", borderRadius: 1, marginBottom: 4 }} />
                  <div style={{ height: 8, background: "rgba(255,255,255,0.06)", borderRadius: 1, width: "60%" }} />
                </div>

                {/* Active placeholder zone */}
                <div className="absolute animate-glow-pulse"
                  style={{ top: 80, left: 24, right: 24, height: 36, border: "1px solid rgba(57,255,20,0.6)", borderRadius: 2, background: "rgba(57,255,20,0.05)" }}>
                  <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs" style={{ color: "rgba(57,255,20,0.8)", fontFamily: "Space Grotesk", fontSize: 10 }}>{"{{name}}"}</span>
                  {/* Resize handle */}
                  <div className="absolute bottom-1 right-1 w-2 h-2" style={{ border: "1px solid rgba(57,255,20,0.5)", borderTop: "none", borderLeft: "none" }} />
                </div>

                {/* Other placeholder zones */}
                {[140, 190].map((top, i) => (
                  <div key={i} className="absolute"
                    style={{ top, left: 24, right: 24, height: 28, border: "1px dashed rgba(255,255,255,0.1)", borderRadius: 2, background: "rgba(255,255,255,0.02)" }}>
                    <span className="absolute top-1/2 left-3 -translate-y-1/2 text-xs" style={{ color: "rgba(255,255,255,0.2)", fontFamily: "Space Grotesk", fontSize: 10 }}>
                      {i === 0 ? "{{date}}" : "{{score}}"}
                    </span>
                  </div>
                ))}

                {/* Lines */}
                {[250, 270, 290, 310, 328].map((top, i) => (
                  <div key={i} className="absolute" style={{ top, left: 24, right: i === 4 ? 80 : 24, height: 4, background: "rgba(255,255,255,0.07)", borderRadius: 1 }} />
                ))}

                {/* Corner marks */}
                <span className="absolute top-1 left-1" style={{ width: 6, height: 6, borderTop: "1px solid rgba(57,255,20,0.3)", borderLeft: "1px solid rgba(57,255,20,0.3)" }} />
                <span className="absolute bottom-1 right-1" style={{ width: 6, height: 6, borderBottom: "1px solid rgba(57,255,20,0.3)", borderRight: "1px solid rgba(57,255,20,0.3)" }} />
              </div>

              {/* Coordinate annotations near document */}
              <span className="absolute top-1/2 -translate-y-1/2 right-12 coord-label" style={{ color: "rgba(57,255,20,0.25)", writingMode: "vertical-rl" }}>Y:180px</span>
            </div>

            {/* Right: Properties panel */}
            <div className="w-52 border-l flex-shrink-0 px-4 py-4" style={{ borderColor: "rgba(57,255,20,0.08)", background: "rgba(0,0,0,0.2)" }}>
              <span className="mono-label block mb-4" style={{ color: "rgba(255,255,255,0.25)" }}>INSPECTOR</span>
              {[
                ["Variable", "{{name}}"],
                ["Type", "Text"],
                ["X", "24px"],
                ["Y", "80px"],
                ["Width", "212px"],
                ["Height", "36px"],
              ].map(([k, v]) => (
                <div key={k} className="flex justify-between items-center py-1.5 border-b" style={{ borderColor: "rgba(255,255,255,0.05)" }}>
                  <span className="text-xs" style={{ color: "rgba(255,255,255,0.25)", fontFamily: "Space Grotesk" }}>{k}</span>
                  <span className="text-xs font-medium" style={{ color: "rgba(57,255,20,0.7)", fontFamily: "Space Grotesk" }}>{v}</span>
                </div>
              ))}
              <div className="mt-4">
                <span className="mono-label block mb-2" style={{ color: "rgba(255,255,255,0.2)" }}>STYLE</span>
                <div className="flex gap-2">
                  {["B", "I", "U"].map(s => (
                    <div key={s} className="w-7 h-7 flex items-center justify-center rounded-sm text-xs font-bold"
                      style={{ border: "1px solid rgba(255,255,255,0.1)", color: "rgba(255,255,255,0.3)", fontFamily: "Space Grotesk" }}>{s}</div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom status bar */}
          <div className="flex items-center justify-between px-5 py-2 border-t" style={{ borderColor: "rgba(57,255,20,0.08)", background: "rgba(0,0,0,0.3)" }}>
            <div className="flex items-center gap-4">
              <span className="mono-label" style={{ color: "rgba(57,255,20,0.4)" }}>● 3 ELEMENTS</span>
              <span className="mono-label" style={{ color: "rgba(255,255,255,0.15)" }}>ZOOM: 100%</span>
            </div>
            <span className="mono-label" style={{ color: "rgba(255,255,255,0.15)" }}>A4 — 210×297mm</span>
          </div>
        </div>
        </SectionReveal>
      </div>
    </section>
  )
}

// --- FeaturesSection.jsx ---
const FEATURES = [
  { id: "mapping", label: "01", title: "Dynamic Placeholder Mapping", desc: "Insert {{variables}} with pixel precision into any document zone.", meta: "CORE ENGINE", size: "large" },
  { id: "spreadsheet", label: "02", title: "Spreadsheet Integration", desc: "Bind CSV or XLSX columns directly to template variables.", meta: "DATA LAYER", size: "medium" },
  { id: "bulk", label: "03", title: "Bulk Document Generation", desc: "Render multiple personalized outputs in a single job.", meta: "RENDER CORE", size: "large" },
  { id: "detection", label: "04", title: "Smart Variable Detection", desc: "Auto-detect and validate all {{tokens}} in your template.", meta: "AI ASSIST", size: "small" },
  { id: "preview", label: "05", title: "Real-time Preview", desc: "See live document changes as you map and configure.", meta: "LIVE UI", size: "small" },
  { id: "automation", label: "06", title: "Workflow Automation", desc: "Schedule, trigger, and chain generation pipelines.", meta: "PIPELINE", size: "medium" },
]

const sizeClasses = {
  large: "col-span-2",
  medium: "col-span-1",
  small: "col-span-1",
}

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 system-grid-fine" />
      <div className="absolute top-0 left-0 right-0 hairline" />

      <div className="relative max-w-[1400px] mx-auto px-8">
        {/* Header */}
        <BlueprintReveal delay={0}>
        <div className="flex items-end justify-between mb-16">
          <div>
            <span className="mono-label text-foreground/30 block mb-3">§ 04 — MODULAR SYSTEM PANELS</span>
            <h2 className="editorial-heading text-[52px] md:text-[72px] leading-none text-foreground">
              SYSTEM<br />
              <span style={{ color: "#39FF14" }}>MODULES.</span>
            </h2>
          </div>
          <div className="hidden md:block text-right">
            <span className="mono-label text-foreground/25 block">8 CORE MODULES</span>
            <span className="mono-label text-foreground/25 block mt-1">ALL SYSTEMS NOMINAL</span>
          </div>
        </div>
        <div className="hairline mb-12" />
        </BlueprintReveal>

        {/* Asymmetric mosaic grid */}
        <StaggerContainer className="grid grid-cols-4 gap-4 auto-rows-[180px]" delay={0.1} stagger={0.08}>
          {FEATURES.map((f, i) => (
            <StaggerItem key={f.id}><FeaturePanel feature={f} index={i} /></StaggerItem>
          ))}
        </StaggerContainer>
      </div>
    </section>
  )
}

function FeaturePanel({ feature }) {
  return (
    <div
      className={`relative sys-node corner-marks rounded-sm p-5 group flex flex-col justify-between bg-white/80 ${sizeClasses[feature.size]}`}
    >
      {/* Top row */}
      <div className="flex items-start justify-between">
        <span className="mono-label text-primary/50 group-hover:text-primary transition-colors">{feature.label}</span>
        <span className="coord-label">{feature.meta}</span>
      </div>

      {/* Content */}
      <div>
        <h3 className="text-base font-bold text-foreground mb-2 leading-snug">{feature.title}</h3>
        <p className="text-xs text-foreground/45 leading-relaxed">{feature.desc}</p>
      </div>

      {/* Status dot */}
      <div className="flex items-center gap-1.5">
        <div className="w-1.5 h-1.5 rounded-full bg-primary/50 group-hover:bg-primary transition-colors" />
        <span className="mono-label text-foreground/30">ONLINE</span>
      </div>

      {/* Hover radial glow */}
      <div
        className="absolute inset-0 rounded-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        style={{ background: "radial-gradient(circle at 10% 90%, rgba(57,255,20,0.05) 0%, transparent 60%)" }}
      />
    </div>
  )
}

function WorkflowDiagnostics() {
  return (
    <div className="sys-node corner-marks p-6 h-full flex flex-col bg-white/80 border-border/10">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <span className="mono-label text-primary flex items-center gap-2">
          <span className="status-pulse" /> SYSTEM_DIAGNOSTICS
        </span>
        <span className="coord-label">[0xFF_2A]</span>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        {[
          { label: "LATENCY", val: "1.2ms", color: "text-primary" },
          { label: "THROUGHPUT", val: "840/s", color: "text-foreground/70" },
          { label: "BUFFER", val: "14%", color: "text-foreground/70" },
          { label: "INTEGRITY", val: "99.9%", color: "text-primary" }
        ].map(s => (
          <div key={s.label} className="border-b border-border/10 pb-2">
            <p className="mono-label text-foreground/30 text-[10px]">{s.label}</p>
            <p className={`text-sm font-bold ${s.color}`}>{s.val}</p>
          </div>
        ))}
      </div>

      {/* Simulated Log */}
      <div className="flex-1 font-mono text-[10px] text-foreground/40 space-y-1.5 overflow-hidden relative min-h-[160px]">
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-background/80 to-transparent z-10" />
        <div className="animate-scroll-log">
          <p className="text-primary/60">[OK] INGESTION_NODE_ACTIVE</p>
          <p>[INFO] BUFFERING SPREADSHEET_STREAM</p>
          <p>[OK] MAPPING_LOGIC_VALIDATED</p>
          <p className="text-primary/60">[OK] ENGINE_WAKING</p>
          <p>[INFO] ALLOCATING MEMORY: 512MB</p>
          <p>[WARN] RETRYING_HANDSHAKE... DONE</p>
          <p className="text-primary/60">[OK] PIPELINE_STABLE</p>
          <p>[INFO] RENDERING_BATCH_ID: 9281</p>
          <p>[INFO] SCANNING_FOR_DELTAS</p>
          <p className="text-primary/60">[OK] CACHE_HIT_RATIO: 0.94</p>
          {/* Repeat for loop */}
          <p className="text-primary/60 mt-4">[OK] INGESTION_NODE_ACTIVE</p>
          <p>[INFO] BUFFERING SPREADSHEET_STREAM</p>
          <p>[OK] MAPPING_LOGIC_VALIDATED</p>
        </div>
      </div>

      {/* Progress Bars */}
      <div className="mt-8 space-y-4">
        {[
          { label: "LOAD", width: "72%" },
          { label: "IO", width: "48%" }
        ].map(b => (
          <div key={b.label}>
            <div className="flex justify-between mb-1">
              <span className="mono-label text-[9px] text-foreground/30">{b.label}</span>
              <span className="mono-label text-[9px] text-primary">{b.width}</span>
            </div>
            <div className="h-1 bg-border/10 rounded-full overflow-hidden">
              <div className="h-full bg-primary/40 rounded-full animate-glow-pulse" style={{ width: b.width }} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
