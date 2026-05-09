import { Button } from "@/components/ui/button"

export default function Navbar() {
  const scrollToDashboard = () => {
    document.getElementById("dashboard")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-border/40">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-2">
          <img src="/logo.png" alt="FlowMint Logo" className="h-8 w-auto object-contain" />
        </div>
        <div className="flex items-center gap-4">
          <Button variant="ghost" onClick={scrollToDashboard}>Dashboard</Button>
          <Button variant="default" onClick={scrollToDashboard}>Get Started</Button>
        </div>
      </div>
    </nav>
  )
}
