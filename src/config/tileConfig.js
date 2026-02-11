// ================= MAIN CATEGORIES =================
export const MAIN_CATEGORIES = [
  { id: 1, slug: "digital-wall-tiles", name: "Digital Wall Tiles" },
  { id: 2, slug: "elevation-tiles", name: "Elevation Tiles" },
  { id: 3, slug: "nano-vitrified-tiles", name: "Nano Vitrified Tiles" },
  { id: 4, slug: "porcelain-tiles", name: "Porcelain Tiles" },
  { id: 5, slug: "gvt-pgvt-vitrified-tiles", name: "GVT / PGVT Vitrified Tiles" },
  { id: 6, slug: "double-charged-vitrified-tiles", name: "Double Charged Vitrified Tiles" },
  { id: 7, slug: "golden-silver-border-tiles", name: "Golden / Silver Border Tiles" },
];

// ================= SIZE CONFIG =================
export const SIZE_CONFIG = [
  { inch: "12x18", mm: "300x450", categories: [1, 2] },
  { inch: "12x24", mm: "300x600", categories: [1] },
  { inch: "24x24", mm: "600x600", categories: [3, 4, 5, 6] },
  { inch: "24x48", mm: "600x1200", categories: [6, 5] },
  { inch: "32x64", mm: "800x1600", categories: [5] },
  { inch: "20x20", mm: "500x500", categories: [2] },
  { inch: "16x16", mm: "400x400", categories: [2] },
  { inch: "12x12", mm: "300x300", categories: [2] },

  // Border tiles (mm only)
  { inch: null, mm: "10x600", categories: [7] },
  { inch: null, mm: "20x600", categories: [7] },
  { inch: null, mm: "48x600", categories: [7] },
  { inch: null, mm: "62x300", categories: [7] },
];

// ================= SERIES =================
export const SERIES = ["Bathroom", "Kitchen", "Poojaroom"];

// ================= FINISH =================
export const FINISH = ["High Gloss", "Carving Matt"];
