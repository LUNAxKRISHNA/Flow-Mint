import Navbar from "@/components/layout/Navbar"
import {
  SplashSection,
  HeroSection,
  WorkflowSection,
  EditorPreviewSection,
  FeaturesSection
} from "@/components/landing/Landing"

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <SplashSection />
      <Navbar />
      <div id="hero">
        <HeroSection />
        <WorkflowSection />
        <EditorPreviewSection />
        <FeaturesSection />
      </div>
    </div>
  )
}
