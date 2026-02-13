import { SIZE_CONFIG } from "../config/tileConfig";

/* ================= GET SIZES BY CATEGORY ================= */

export const getSizesByCategory = (categoryId) => {
  if (!categoryId || categoryId === "All") {
    return SIZE_CONFIG;
  }

  return SIZE_CONFIG.filter((size) =>
    size.categories.includes(categoryId)
  );
};

/* ================= AUTO IMPORT ALL IMAGES ================= */

const allImages = import.meta.glob(
  "../assets/tiles/*/*.{jpg,jpeg,png,webp}",
  { eager: true }
);

/* ================= GET IMAGES BY SIZE ================= */

export const getImagesBySize = (sizeMm) => {
  const images = Object.entries(allImages)
    .filter(([path]) => path.includes(`/tiles/${sizeMm}/`))
    .map(([path, module]) => {
  const fileName = path.split("/").pop().split(".")[0];

  return {
    image: module.default,
    name: fileName,
    finish: getFinishFromFileName(path), // ✅ attach real finish
  };
});


  return images;
};

/* ================= GENERATE TILE DATA ================= */

export const generateTiles = ({
  categoryId,
  sizeMm,
  series,
  finish,
}) => {
  const sizes = getSizesByCategory(categoryId);

  const filteredSizes = sizeMm
    ? sizes.filter((s) => s.mm === sizeMm)
    : sizes;

  let tiles = [];

  filteredSizes.forEach((size) => {
    const images = getImagesBySize(size.mm);

    images.forEach((imgObj, index) => {
      tiles.push({
        id: `${size.mm}-${index}`,
        image: imgObj.image,
        name: imgObj.name, // 👈 auto file name
        sizeMm: size.mm,
        sizeInch: size.inch,
        categoryId,
        finish: imgObj.finish, 
      });
    });
  });
if (finish && finish !== "All") {
  tiles = tiles.filter((tile) => tile.finish === finish);
}
  return tiles;
};


export const getAspectRatioStyle = (mm) => {
  if (!mm) return {};

  const [w, h] = mm.split("x").map(Number);

  if (!w || !h) return {};

  return {
    aspectRatio: `${h} / ${w}`,
  };
};

/* ================= PARSE FINISH FROM FILE NAME ================= */

const getFinishFromFileName = (filePath) => {
  const fileName = filePath.split("/").pop().toUpperCase();

  if (fileName.includes("-HL")) return "High Gloss";

  // Future expansion examples:
  // if (fileName.includes("-MT")) return "Matt";
  // if (fileName.includes("-CM")) return "Carving Matt";
  // if (fileName.includes("-DC")) return "Decor";
  // if (fileName.includes("-SK")) return "Skiner";

  return "Glossy"; // default
};