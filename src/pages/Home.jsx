import { motion } from "framer-motion"
import { ArrowRight, Layers, LayoutTemplate, Zap, Plus, FolderOpen, FileText, Settings, Users } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useNavigate } from "react-router-dom"
import Navbar from "@/components/layout/Navbar"

export default function Home() {
  const navigate = useNavigate()

  return (
    <div className="relative flex flex-col min-h-screen">
      <Navbar />

      {/* --- Landing Section --- */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background gradient blur */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
        
        <div className="container relative z-10 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center rounded-full border border-primary/20 bg-primary/10 px-3 py-1 text-sm text-primary mb-6">
              <Zap className="mr-2 h-4 w-4" />
              <span>Next-Gen Document Automation</span>
            </div>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mb-6"
          >
            Generate bulk documents with <span className="text-gradient">precision & ease</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl text-muted-foreground max-w-2xl mb-10"
          >
            Upload templates, map data from spreadsheets, and instantly generate personalized PDFs at scale. Built for modern teams.
          </motion.p>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex gap-4"
          >
            <Button size="lg" className="h-12 px-8 text-base" onClick={() => document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })}>
              Open Dashboard
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button size="lg" variant="outline" className="h-12 px-8 text-base">
              View Demo
            </Button>
          </motion.div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-24 text-left w-full max-w-5xl">
            <FeatureCard 
              icon={<LayoutTemplate />}
              title="Visual Template Editor"
              description="Drag and drop placeholders onto your actual document templates for pixel-perfect placement."
              delay={0.4}
            />
            <FeatureCard 
              icon={<Layers />}
              title="Bulk Data Mapping"
              description="Seamlessly upload CSVs and map columns to your template placeholders instantly."
              delay={0.5}
            />
            <FeatureCard 
              icon={<Zap />}
              title="Lightning Fast Output"
              description="Generate hundreds of PDFs in seconds with our highly optimized rendering engine."
              delay={0.6}
            />
          </div>
        </div>
      </section>

      <div className="w-full h-px bg-border/50" />

      {/* --- Dashboard Section --- */}
      <section id="dashboard" className="flex-1 bg-muted/30 pt-8 pb-20 border-t border-border/50">
        <div className="container">
          <div className="flex items-end justify-between mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
              <p className="text-muted-foreground mt-1">Manage your document generation projects.</p>
            </div>
            <Button onClick={() => navigate("/editor")}>
              <Plus className="mr-2 h-4 w-4" /> New Project
            </Button>
          </div>

          <div className="grid md:grid-cols-4 gap-6">
            {/* Sidebar navigation (Mock) */}
            <div className="col-span-1 space-y-2 hidden md:block">
              <SidebarItem icon={<FolderOpen />} label="Projects" active />
              <SidebarItem icon={<LayoutTemplate />} label="Templates" />
              <SidebarItem icon={<Users />} label="Team" />
              <SidebarItem icon={<Settings />} label="Settings" />
            </div>

            {/* Main Content Area */}
            <div className="col-span-1 md:col-span-3">
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {/* Create New Card */}
                <Card className="flex flex-col items-center justify-center text-center p-6 border-dashed border-2 hover:border-primary/50 hover:bg-primary/5 cursor-pointer transition-colors" onClick={() => navigate("/editor")}>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <Plus className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-medium text-lg">Create Project</h3>
                  <p className="text-sm text-muted-foreground mt-1">Start a new document batch</p>
                </Card>

                {/* Recent Projects */}
                <ProjectCard title="Event Certificates" date="2 hours ago" status="Draft" />
                <ProjectCard title="Q3 Invoices" date="Yesterday" status="Completed" />
                <ProjectCard title="Employee Offers" date="May 4, 2026" status="Completed" />
                <ProjectCard title="NDA Agreements" date="May 1, 2026" status="Draft" />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

function FeatureCard({ icon, title, description, delay }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="p-6 rounded-2xl border border-border/50 bg-card/50 backdrop-blur-sm"
    >
      <div className="mb-4 text-primary w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-muted-foreground">{description}</p>
    </motion.div>
  )
}

function SidebarItem({ icon, label, active }) {
  return (
    <button className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors ${active ? "bg-primary/10 text-primary font-medium" : "text-muted-foreground hover:bg-muted hover:text-foreground"}`}>
      <span className="mr-3">{icon}</span>
      {label}
    </button>
  )
}

function ProjectCard({ title, date, status }) {
  const navigate = useNavigate()
  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer group" onClick={() => navigate("/editor")}>
      <CardHeader className="p-5 pb-0">
        <div className="flex justify-between items-start">
          <div className="w-10 h-10 rounded-md bg-muted flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <FileText className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <span className={`text-xs px-2 py-1 rounded-full ${status === 'Completed' ? 'bg-green-500/10 text-green-500' : 'bg-orange-500/10 text-orange-500'}`}>
            {status}
          </span>
        </div>
        <CardTitle className="mt-4 text-lg">{title}</CardTitle>
        <CardDescription>{date}</CardDescription>
      </CardHeader>
      <CardContent className="p-5 pt-4">
        <div className="flex items-center text-sm text-muted-foreground">
          <Layers className="h-4 w-4 mr-2" />
          1 Template • 150 Rows
        </div>
      </CardContent>
    </Card>
  )
}
