import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Editor from "./pages/Editor"
import Onboarding from "./pages/Onboarding"
import Docs from "./pages/Docs"
import Navbar from "./components/layout/Navbar"
import { Analytics } from "@vercel/analytics/react"

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-background text-foreground font-sans">
        <Analytics />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/setup" element={<Onboarding />} />
          <Route path="/editor" element={<Editor />} />
          <Route path="/docs" element={<Docs />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
