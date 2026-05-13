import {
  SplashSection,
  HeroSection,
  EcosystemHub,
  WorkflowSection,
  EditorPreviewSection
} from "@/components/landing/Landing"

export default function Home() {
  return (
    <div className="relative flex flex-col min-h-screen overflow-x-hidden">
      <SplashSection />
      <div id="hero">
        <HeroSection />
        <EcosystemHub />
        <WorkflowSection />
        <EditorPreviewSection />
      </div>
    </div>
  )
}
