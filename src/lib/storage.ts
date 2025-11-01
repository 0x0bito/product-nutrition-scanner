import type { EssentialData } from "@/types/openfoodfacts";

export function saveToHistory(productData: EssentialData) {
  try {
    const history = localStorage.getItem("scan-history");
    const existingHistory = history ? JSON.parse(history) : [];

    let newHistory = existingHistory;
    if (
      !existingHistory.some(
        (item: EssentialData) =>
          item.name === productData.name &&
          item.nutrition.energy === productData.nutrition.energy,
      )
    ) {
      newHistory = [productData, ...existingHistory].slice(0, 100);
    }
    localStorage.setItem("scan-history", JSON.stringify(newHistory));
  } catch (err) {
    console.error("failed to save to history: ", err);
  }
}

export function loadHistory() {
  try {
    const history = localStorage.getItem("scan-history");
    return history ? JSON.parse(history) : [];
  } catch (err) {
    console.error("failed to get history: ", err);
  }
}
