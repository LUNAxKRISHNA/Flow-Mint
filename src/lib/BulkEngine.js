import html2canvas from "html2canvas"
import jsPDF from "jspdf"
import JSZip from "jszip"

/**
 * Renders a single document row into a canvas snapshot.
 * @param {HTMLElement} el - The hidden render element.
 * @returns {Promise<HTMLCanvasElement>}
 */
async function captureElement(el) {
  return html2canvas(el, {
    useCORS: true,
    allowTaint: true,
    scale: 2, // 2x for high-res
    backgroundColor: null,
    logging: false,
  })
}

/**
 * Generate a filename for a given row index.
 * Uses the first value in the row as a prefix if available.
 * @param {Object} row
 * @param {number} index
 * @param {string} ext
 * @returns {string}
 */
function rowFilename(row, index, ext, filenameHeader) {
  const val = filenameHeader ? row[filenameHeader] : Object.values(row)[0]
  
  // Create a safe slug: alphanumeric, underscores, hyphens
  const slug = val
    ? String(val).replace(/[^a-z0-9\-_]/gi, "_").trim()
    : `record_${String(index + 1).padStart(3, "0")}`

  // Ensure it's not empty after cleaning and not too long
  const finalSlug = slug.slice(0, 64) || `record_${String(index + 1).padStart(3, "0")}`
  
  return `${finalSlug}.${ext}`
}

/**
 * Core bulk generation function.
 *
 * @param {Object} options
 * @param {Object[]} options.rows          - Array of CSV row objects.
 * @param {Object[]} options.placeholders  - Placeholder definitions from the editor.
 * @param {Object}   options.mappings      - { placeholderId: csvHeaderName }
 * @param {string}   options.templateImage - DataURL of the background template.
 * @param {{ w: number, h: number }} options.canvasSize - Canvas dimensions in px.
 * @param {"pdf"|"png"} options.exportFormat
 * @param {(current: number, total: number) => void} options.onProgress - Progress callback.
 */
export async function runBulkGeneration({
  rows,
  placeholders,
  mappings,
  templateImage,
  canvasSize,
  exportFormat,
  filenameHeader,
  onProgress,
}) {
  const zip = new JSZip()
  const total = rows.length
  const ext = exportFormat === "pdf" ? "pdf" : "png"

  // Create a hidden off-screen render container
  const container = document.createElement("div")
  container.style.cssText = `
    position: fixed;
    top: -9999px;
    left: -9999px;
    width: ${canvasSize.w}px;
    height: ${canvasSize.h}px;
    overflow: hidden;
    background: white;
  `
  document.body.appendChild(container)

  try {
    for (let i = 0; i < total; i++) {
      const row = rows[i]

      // ── Build the render DOM ──────────────────────────────────────
      container.innerHTML = ""

      // Background template image
      const bg = document.createElement("img")
      bg.src = templateImage
      bg.style.cssText = `
        position: absolute;
        top: 0; left: 0;
        width: 100%; height: 100%;
        object-fit: fill;
      `
      container.appendChild(bg)

      // Wait for image to be loaded (may be cached already)
      await new Promise((resolve) => {
        if (bg.complete) resolve()
        else bg.onload = resolve
      })

      // Place each placeholder as a real text element
      for (const ph of placeholders) {
        const mappedHeader = mappings[ph.id]
        const value = mappedHeader ? (row[mappedHeader] ?? "") : `{{${ph.key}}}`

        const justifyContent = ph.align === "center" ? "center" : ph.align === "right" ? "flex-end" : "flex-start"

        const el = document.createElement("div")
        el.style.cssText = `
          position: absolute;
          left: ${ph.x}px;
          top: ${ph.y}px;
          width: ${ph.width}px;
          height: ${ph.height}px;
          display: flex;
          align-items: center;
          justify-content: ${justifyContent};
          padding: 0 8px;
          font-family: ${ph.fontFamily}, Inter, sans-serif;
          font-size: ${ph.fontSize}px;
          font-weight: ${ph.fontWeight === "Bold" ? 700 : ph.fontWeight === "Medium" ? 500 : 400};
          font-style: ${ph.fontStyle};
          color: ${ph.color};
          text-align: ${ph.align};
          overflow: hidden;
          white-space: nowrap;
          box-sizing: border-box;
        `
        el.textContent = value
        container.appendChild(el)
      }

      // ── Capture ───────────────────────────────────────────────────
      const canvas = await captureElement(container)

      // ── Convert & pack into ZIP ───────────────────────────────────
      if (exportFormat === "pdf") {
        const imgData = canvas.toDataURL("image/jpeg", 0.95)
        // Use canvas pixel size; jsPDF uses pt so convert px → pt (96dpi)
        const pxToPt = (px) => (px * 72) / 96
        const pdf = new jsPDF({
          orientation: canvasSize.w > canvasSize.h ? "landscape" : "portrait",
          unit: "pt",
          format: [pxToPt(canvasSize.w), pxToPt(canvasSize.h)],
        })
        pdf.addImage(imgData, "JPEG", 0, 0, pxToPt(canvasSize.w), pxToPt(canvasSize.h))
        const pdfBlob = pdf.output("blob")
        zip.file(rowFilename(row, i, "pdf", filenameHeader), pdfBlob)
      } else {
        const blob = await new Promise((resolve) => canvas.toBlob(resolve, "image/png"))
        zip.file(rowFilename(row, i, "png", filenameHeader), blob)
      }

      onProgress(i + 1, total)

      // Yield to keep the UI responsive every 5 items
      if (i % 5 === 4) await new Promise((r) => setTimeout(r, 0))
    }

    onProgress(total, total)

    // ── Finalize ZIP ─────────────────────────────────────────────
    const zipBlob = await zip.generateAsync({ type: "blob", compression: "DEFLATE" })

    const link = document.createElement("a")
    link.href = URL.createObjectURL(zipBlob)
    link.download = `flowmint_bulk_${ext}_${Date.now()}.zip`
    link.click()
    URL.revokeObjectURL(link.href)
  } finally {
    document.body.removeChild(container)
  }
}
