"use client";

import { useRouter } from "next/navigation";
import { loadHistory } from "@/lib/storage";
import type { EssentialData } from "@/types/openfoodfacts";
import Trash from "../../public/trash.svg";
import ProductHistoryCard from "./ProductHistoryCard";

export default function HistoryTab() {
  const router = useRouter();
  const history: EssentialData[] = loadHistory();

  const handleClearHistory = () => {
    localStorage.clear();
    router.refresh();
  };

  return (
    <div className="space-y-6 h-[calc(100%-65px)]">
      <h1 className="text-4xl font-semibold text-center">History</h1>
      {history.length > 0 && (
        <div className="flex justify-between items-center">
          <p className="text-sm font-medium">
            {history.length} {history.length <= 1 && "item"}{" "}
            {history.length > 1 && "items"}
          </p>
          <button
            type="button"
            className="flex gap-2 text-red-500 font-medium text-sm hover:text-red-600"
            onClick={handleClearHistory}
          >
            <Trash className="w-4 h-4" />
            Clear All
          </button>
        </div>
      )}
      <div
        className={`flex flex-col items-center gap-2 overflow-y-scroll scrollbar-thin h-[85%]`}
      >
        {history.map((product) => (
          <ProductHistoryCard
            key={product.name + product.nutrition.energy}
            name={product.name}
            brand={product.brand}
            nutriScore={product.nutriScore}
            nutrition={product.nutrition}
            scannedAt={product.scannedAt || ""}
          />
        ))}
        {history.length === 0 && (
          <p className="text-lg text-gray-500 absolute left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]">
            No Product Scanned
          </p>
        )}
      </div>
    </div>
  );
}
