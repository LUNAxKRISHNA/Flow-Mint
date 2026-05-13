export const FONT_LIST = [
  { name: "Inter", category: "Sans-serif" },
  { name: "Space Grotesk", category: "Sans-serif" },
  { name: "Outfit", category: "Sans-serif" },
  { name: "Poppins", category: "Sans-serif" },
  { name: "Montserrat", category: "Sans-serif" },
  { name: "Roboto", category: "Sans-serif" },
  { name: "Playfair Display", category: "Serif" },
  { name: "EB Garamond", category: "Serif" },
  { name: "Lora", category: "Serif" },
  { name: "Merriweather", category: "Serif" },
  { name: "JetBrains Mono", category: "Monospace" },
  { name: "Space Mono", category: "Monospace" },
]

export const GOOGLE_FONTS_URL = "https://fonts.googleapis.com/css2?" + 
  [
    "Inter:wght@400;500;700",
    "Space+Grotesk:wght@400;500;700",
    "Outfit:wght@400;500;700",
    "Poppins:wght@400;500;700",
    "Montserrat:wght@400;500;700",
    "Roboto:wght@400;500;700",
    "Playfair+Display:wght@400;700",
    "EB+Garamond:wght@400;700",
    "Lora:wght@400;700",
    "Merriweather:wght@400;700",
    "JetBrains+Mono:wght@400;700",
    "Space+Mono:wght@400;700"
  ].map(f => `family=${f}`).join("&") + 
  "&display=swap"
