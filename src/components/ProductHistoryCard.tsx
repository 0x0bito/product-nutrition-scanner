import { getMetric, getNutritionScoreColor } from "@/lib/metrics";
import type { ProductHistoryEssentialData } from "@/types/openfoodfacts";

// export default function ProductHistoryCard(
//   productData: ProductHistoryEssentialData
// ) {
//   if (!productData) {
//     return;
//   }
//   return (
//     <div className="max-w-[600px] max-h-[200px] w-full space-y-2 bg-gray-100 p-2 rounded-lg">
//       {/* TOP */}
//       <div className="flex justify-between">
//         <div className="space-y-1">
//           <h1 className="font-bold text-gray-800 text-lg">
//             {productData.name}
//           </h1>
//           <p className="text-sm text-gray-500">{productData.brand}</p>
//         </div>
//         {productData.nutriScore &&
//           getNutritionScoreColor(productData.nutriScore) !== "bg-gray-300" && (
//             <div
//               className={`text-white rounded-lg flex items-center justify-center text-lg font-semibold p-4 w-[35px] h-[35px] ${
//                 productData.nutriScore &&
//                 getNutritionScoreColor(productData.nutriScore)
//               }`}
//             >
//               {productData.nutriScore}
//             </div>
//           )}
//       </div>
//       {/* MID */}
//       <div className="flex gap-2 flex-wrap">
//         {(
//           [
//             "energy",
//             "fat",
//             "carbohydrates",
//             "saturated-fat",
//             "sugars",
//             "proteins",
//             "salt",
//           ] as const
//         ).map((nutrition) => (
//           <div key={nutrition} className="flex gap-2 text-sm">
//             <p className="flex items-center justify-center gap-2 font-semibold capitalize">
//               {nutrition.split("-").join(" ")}
//             </p>
//             <p>
//               {productData?.nutrition[nutrition]}
//               {getMetric(nutrition)}
//             </p>
//           </div>
//         ))}
//       </div>
//       {/* BOTT */}
//       <span className="block text-right opacity-40 text-sm">
//         {productData.scannedAt
//           ? timeAgo(productData.scannedAt)
//           : `time: ${productData.scannedAt}`}
//       </span>
//     </div>
//   );
// }

export default function ProductHistoryCard(
  product: ProductHistoryEssentialData,
) {
  return (
    <div className="w-full rounded-lg border-gray-200 border-[1px]">
      <div className="p-4">
        <div className="flex items-start justify-between gap-3 mb-4">
          <div className="flex-1">
            <h2 className="text-base font-bold text-black">{product.name}</h2>
            <p className="text-xs text-black mt-0.5">{product.brand}</p>
          </div>
          <div
            className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg font-bold text-lg text-white ${getNutritionScoreColor(
              product.nutriScore || "",
            )}`}
          >
            {product.nutriScore === "UNKNOWN" ? "?" : product.nutriScore}
          </div>
        </div>
      </div>
      <div className="px-4 pb-4">
        <div className="space-y-2.5">
          {(
            [
              "energy",
              "fat",
              "carbohydrates",
              "saturated-fat",
              "sugars",
              "proteins",
              "salt",
            ] as const
          ).map((nutrition) => (
            <div
              key={nutrition}
              className="flex justify-between items-baseline"
            >
              <span className="text-sm font-medium text-black">
                {nutrition}
              </span>
              <span className="text-sm font-semibold text-black">
                {product?.nutrition[nutrition].toFixed(2)}{" "}
                {getMetric(nutrition)}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
