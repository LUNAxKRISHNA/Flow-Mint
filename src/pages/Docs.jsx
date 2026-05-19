import React from "react"
import { motion } from "framer-motion"
import { useNavigate } from "react-router-dom"
import { ArrowLeft, Database, FileText, Zap, Layout, ArrowRight } from "lucide-react"
import Footer from "@/components/layout/Footer"

const Section = ({ title, icon: Icon, children, delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    className="relative p-8 border border-[#1a1a1a]/10 bg-white/40 backdrop-blur-sm group hover:border-[#39FF14]/30 transition-colors duration-500"
  >
    <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
      <Icon size={48} />
    </div>
    <div className="flex items-center gap-3 mb-6">
      <div className="w-8 h-8 flex items-center justify-center border border-[#39FF14]/40 bg-[#39FF14]/5">
        <Icon size={16} className="text-[#39FF14]" />
      </div>
      <h3 className="text-sm font-medium tracking-[0.2em] uppercase text-[#1a1a1a]">{title}</h3>
    </div>
    <div className="space-y-4 text-[14px] leading-relaxed text-[#1a1a1a]/70">
      {children}
    </div>
  </motion.div>
)

export default function Docs() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-[#f5f5f3] font-['Space_Grotesk'] text-[#1a1a1a] selection:bg-[#39FF14]/30">

      {/* Background System Grid */}
      <div className="fixed inset-0 system-grid opacity-[0.03] pointer-events-none" />

      <main className="relative pt-32 pb-24 px-6 md:px-12 max-w-7xl mx-auto">

        {/* Breadcrumb / Back */}
        <motion.button
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => navigate("/")}
          className="flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase opacity-40 hover:opacity-100 transition-opacity mb-12"
        >
          <ArrowLeft size={12} />
          Back to Terminal
        </motion.button>

        {/* Hero Section */}
        <header className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block text-[10px] font-mono tracking-[0.3em] uppercase text-[#39FF14] mb-4">
              System Documentation // v1.0.4
            </span>
            <h1 className="editorial-heading text-6xl md:text-8xl mb-8">
              Flow<span className="text-[#39FF14]">Gen</span> <br />
              <span className="text-[#1a1a1a]/30">Bulk Engine.</span>
            </h1>
            <p className="max-w-2xl text-lg text-[#1a1a1a]/60 leading-relaxed">
              FlowGen is the high-performance bulk document generation engine within the FlowMint ecosystem.
              Engineered for precision and scale, it allows users to transform static templates into
              hundreds of personalized documents using mapped data streams.
            </p>
          </motion.div>
        </header>

        {/* Feature Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-32">
          <Section title="Precision Mapping" icon={Database} delay={0.1}>
            <p>Connect your CSV data sources to template placeholders with intelligent fuzzy-matching technology. FlowGen automatically identifies potential mappings between your spreadsheet headers and document fields.</p>
          </Section>
          <Section title="Dynamic Rendering" icon={Layout} delay={0.2}>
            <p>Support for multi-format templates including high-resolution images and PDFs. Adjust typography, positioning, and alignment with pixel-perfect accuracy before initiating batch processes.</p>
          </Section>
          <Section title="Async Generation" icon={Zap} delay={0.3}>
            <p>Our proprietary client-side engine processes records asynchronously, ensuring high performance without server latency. Generate hundreds of personalized files in seconds, delivered as a structured ZIP archive.</p>
          </Section>
        </div>

        {/* Implementation Guide */}
        <section className="mb-32">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="text-2xl font-bold tracking-tight">How to use FlowGen</h2>
            <div className="h-px flex-1 bg-[#1a1a1a]/10" />
          </div>

          <div className="space-y-12">
            {[
              {
                step: "01",
                title: "Initialize Workspace",
                desc: "Navigate to the Workspace and upload your base template. We support standard document formats and high-fidelity image assets.",
                action: "Go to Workspace",
                path: "/setup"
              },
              {
                step: "02",
                title: "Data Ingestion",
                desc: "Upload your CSV containing the variable data. FlowGen will attempt to auto-map your columns to the placeholders on your canvas.",
                action: null
              },
              {
                step: "03",
                title: "Execute & Export",
                desc: "Review your mappings, select your export format (PDF/PNG), and trigger the Bulk Engine. Your batch will be generated and packaged instantly.",
                action: null
              }
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="flex gap-8 group"
              >
                <span className="text-4xl font-bold text-[#1a1a1a]/10 group-hover:text-[#39FF14]/20 transition-colors tabular-nums">{item.step}</span>
                <div className="flex-1 pb-12 border-b border-[#1a1a1a]/5">
                  <h4 className="text-lg font-medium mb-3">{item.title}</h4>
                  <p className="text-[#1a1a1a]/60 max-w-xl mb-6">{item.desc}</p>
                  {item.action && (
                    <button
                      onClick={() => navigate(item.path)}
                      className="flex items-center gap-2 text-[10px] font-bold tracking-widest uppercase text-[#39FF14] hover:gap-4 transition-all"
                    >
                      {item.action} <ArrowRight size={14} />
                    </button>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

      </main>
      <Footer />
    </div>
  )
}
