import { useNavigate, useParams } from "react-router-dom";
import { useMemo } from "react";
import { generateTiles, getAspectRatioStyle } from "../helpers/tileHelper";

const TileDetail = () => {
  const { size, slug } = useParams();
  const navigate = useNavigate();

  const tiles = useMemo(() => {
    return generateTiles({
      categoryId: "All",
      sizeMm: size,
      series: null,
      finish: null,
    });
  }, [size]);

  const tile = tiles.find(
    (t) => t.name.toLowerCase().replace(/\s+/g, "-") === slug,
  );

  //   const getBaseCode = (name) => {
  //     return name.split("-")[0]; // 1276 from 1276-L
  //   };
  const getBaseCode = (name) => {
    const match = name.match(/^\d+/); // only starting numbers
    return match ? match[0] : name;
  };

  const baseCode = getBaseCode(tile.name);

  const variants = tiles.filter((t) => getBaseCode(t.name) === baseCode);
  if (!tile)
    return <div className="p-20 text-black text-xl">Tile not found</div>;

  return (
    <>
      <div className="h-screen bg-neutral-100 text-black flex items-center">
        <div className="w-full max-w-7xl mx-auto px-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center h-[80vh]">
            {/* ================= LEFT IMAGE ================= */}
            <div className="flex items-center justify-center h-full">
              <div
                className="relative bg-white shadow-[0_30px_60px_rgba(0,0,0,0.15)] flex items-center justify-center max-h-full"
                style={{
                  ...getAspectRatioStyle(tile.sizeMm),
                  maxHeight: "60vh",
                }}
              >
                <img
                  src={tile.image}
                  alt={tile.name}
                  className=" w-full h-full object-cover"
                />
              </div>
            </div>

            {/* ================= RIGHT DETAILS ================= */}
            <div className="flex flex-col justify-center h-full space-y-8">
              <div>
                <p className="text-xs uppercase tracking-widest text-neutral-500">
                  Premium Collection
                </p>

                <h1 className="mt-3 text-4xl xl:text-5xl font-semibold tracking-tight">
                  {tile.name}
                </h1>

                <p className="mt-4 text-neutral-500">
                  Refined surface crafted for contemporary architectural spaces.
                </p>
              </div>

              {/* SPEC TABLE */}
              <div className="space-y-5 text-sm border-t border-neutral-300 pt-6">
                <div className="flex justify-between">
                  <span className="text-neutral-500">Size</span>
                  <span className="font-medium">{tile.sizeMm} MM</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Finish</span>
                  <span className="font-medium">{tile.finish}</span>
                </div>

                <div className="flex justify-between">
                  <span className="text-neutral-500">Series</span>
                  <span className="font-medium">
                    {tile.series || "Standard"}
                  </span>
                </div>
              </div>

              <div className="pt-6 flex gap-5">
                <button className="px-8 py-3 bg-black text-white rounded-full font-medium hover:bg-neutral-800 transition">
                  Enquire Now
                </button>

                <button className="px-8 py-3 border border-black rounded-full font-medium hover:bg-black hover:text-white transition">
                  Download Catalogue
                </button>
              </div>
            </div>
          </div>
          {/* ================= VARIANTS ================= */}
          {variants.length > 1 && (
            <div className="mt-0 pl-16">
              <h3 className="text-sm font-medium mb-4 text-neutral-500 uppercase tracking-wide">
                Available Variants
              </h3>

              <div className="flex gap-4 flex-wrap">
                {variants.map((v) => (
                  <div
                    key={v.id}
                    onClick={() =>
                      navigate(
                        `/collections/${v.sizeMm}/${v.name
                          .toLowerCase()
                          .replace(/\s+/g, "-")}`,
                      )
                    }
                    className={`cursor-pointer border p-2 transition-all ${
                      v.name === tile.name
                        ? "border-black"
                        : "border-neutral-300 hover:border-black"
                    }`}
                  >
                    <div className="w-16" style={getAspectRatioStyle(v.sizeMm)}>
                      <img
                        src={v.image}
                        alt={v.name}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <p className="text-xs mt-2 text-center">{v.name}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default TileDetail;
