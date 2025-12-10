import type { EssentialData } from "@/types/openfoodfacts";

export function saveToHistory(productData: EssentialData) {
  const history = localStorage.getItem("scan-history");
  const existingHistory = history ? JSON.parse(history) : [];

  // avoid duplicate
  if (
    existingHistory.some(
      (item: EssentialData) =>
        item.name === productData.name &&
        item.nutrition.energy === productData.nutrition.energy,
    )
  ) {
    return;
  }

  const newHistory = [productData, ...existingHistory];
  try {
    localStorage.setItem("scan-history", JSON.stringify(newHistory));
  } catch (error) {
    const isQuotaExceeded =
      error instanceof DOMException &&
      (error.name === "QuotaExceededError" ||
        error.name === "NS_ERROR_DOM_QUOTA_REACHED");
    if (!isQuotaExceeded) {
      return;
    }

    // remove products until new one got saved to localStorage successfully
    while (newHistory.length > 0) {
      newHistory.pop();
      try {
        localStorage.setItem("scan-history", JSON.stringify(newHistory));
        break;
      } catch { }
    }
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
