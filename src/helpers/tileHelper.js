// import { MAIN_CATEGORIES, SIZE_CONFIG } from "../config/tileConfig";

// /* ================= GET SIZES BY CATEGORY ================= */

// export const getSizesByCategory = (categoryId) => {
//   if (!categoryId || categoryId === "All") {
//     return SIZE_CONFIG;
//   }

//   return SIZE_CONFIG.filter((size) =>
//     size.categories.includes(categoryId)
//   );
// };

// /* ================= GET IMAGES BY SIZE ================= */

// export const getImagesBySize = async (sizeMm) => {
//   try {
//     // This works in Vite
//     const images = import.meta.glob(
//       `/public/tiles/${sizeMm}/*.{jpg,jpeg,png,webp}`,
//       { eager: true }
//     );

//     return Object.values(images).map((mod) => mod.default);
//   } catch (err) {
//     console.warn("No images found for size:", sizeMm);
//     return [];
//   }
// };

// /* ================= GENERATE TILE DATA ================= */

// export const generateTiles = async ({
//   categoryId,
//   sizeMm,
//   series,
//   finish,
// }) => {
//   const sizes = getSizesByCategory(categoryId);

//   const filteredSizes = sizeMm
//     ? sizes.filter((s) => s.mm === sizeMm)
//     : sizes;

//   let tiles = [];

//   for (const size of filteredSizes) {
//     const images = await getImagesBySize(size.mm);

//     images.forEach((img, index) => {
//       tiles.push({
//         id: `${size.mm}-${index}`,
//         image: img,
//         sizeMm: size.mm,
//         sizeInch: size.inch,
//         categoryId,
//         series,
//         finish,
//       });
//     });
//   }

//   return tiles;
// };


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
      const fileName = path.split("/").pop().split(".")[0]; // 👈 auto name from file
      return {
        image: module.default,
        name: fileName,
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
        series,
        finish,
      });
    });
  });

  return tiles;
};
