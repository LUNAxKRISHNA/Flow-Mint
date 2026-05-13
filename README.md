# ✦ FlowMint
### Modular Creative OS // Orchestrated Efficiency

[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite)](https://vitejs.dev/)
[![Tailwind](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/Status-v1.0.0--Stable-39FF14)](https://github.com/LUNAxKRISHNA/Flow-Mint)

**FlowMint** is a high-performance creative operating system designed to automate complex design workflows. It provides a suite of modular tools for developers and designers to orchestrate asset generation, data mapping, and bulk document production at scale.

---

## ⚡ Flagship Module: FlowGen (Module 01)
**FlowGen** is our intelligent bulk document generation engine. It enables the transformation of static design templates into thousands of personalized documents in seconds.

### The Pipeline Architecture:
1.  **Template Ingestion**: High-fidelity support for `.PNG`, `.JPG`, and `.PDF` templates.
2.  **Variable Mapping**: Intuitive canvas editor to place `{{variable}}` tokens with sub-pixel precision.
3.  **Data Binding**: Intelligent CSV/XLSX ingestion with automatic field mapping and validation.
4.  **Batch Rendering**: Industrial-grade engine producing high-resolution PDFs and PNGs bundled into ZIP archives.

---

## 🛠️ Technical Stack
Built with a modern, high-performance stack for a seamless editorial experience:

-   **Core**: [React 19](https://react.dev/) + [Vite](https://vite.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/) + [Framer Motion](https://www.framer.com/motion/) (Editorial Animations)
-   **UI Primitives**: [Radix UI](https://www.radix-ui.com/)
-   **Document Engine**: 
    -   `pdfjs-dist`: High-performance PDF parsing
    -   `jspdf`: Vector-perfect PDF generation
    -   `html2canvas`: Precise DOM-to-Canvas rendering
    -   `jszip`: High-speed client-side archive creation
-   **Icons**: [Lucide React](https://lucide.dev/)

---

## 📂 Project Structure
```text
src/
├── components/
│   ├── editor/      # Precision canvas and property panels
│   ├── landing/     # High-fidelity landing page (Splash, Hero, Ecosystem)
│   ├── dashboard/   # System diagnostics and data management
│   ├── layout/      # Core application shell and navigation
│   └── ui/          # Atomic design components (Shadcn-inspired)
├── pages/
│   ├── Home.jsx     # Landing portal
│   ├── Editor.jsx   # Creative workspace
│   ├── Docs.jsx     # Documentation & Guides
│   └── Onboarding.jsx # Setup & Ingestion workflow
├── lib/             # Core engines and mapping logic
├── constants/       # Global configuration
└── assets/          # Static branding & design tokens
```

---

## 🚀 Getting Started

### Prerequisites
-   Node.js (v18 or higher)
-   npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/LUNAxKRISHNA/Flow-Mint.git

# Navigate to project
cd Flow-Mint

# Install dependencies
npm install

# Start development server
npm run dev
```

### Production Build
```bash
npm run build
npm run preview
```

---

## 💎 Design Philosophy
FlowMint adheres to a **High-Tech Editorial** aesthetic:
-   **Precision Grid System**: Uniform 24px/48px grid layouts.
-   **Glassmorphism**: Layered depth with backdrop blurs.
-   **Mono-Labeling**: Technical metadata and coordinate markers for a "system" feel.
-   **Scanning Effects**: Subtle micro-animations that imply live data processing.

---

## 🛰️ Ecosystem Status
-   **Module 01: FlowGen** — `STABLE`
-   **Module 02: AssetFlow** — `IN_DEVELOPMENT`
-   **Module 03: PulseNet** — `CONCEPT`

---

Developed with ❤️ by **LUNA x KRISHNA** // 2026
