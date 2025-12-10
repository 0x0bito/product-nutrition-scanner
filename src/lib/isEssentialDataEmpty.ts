import type { EssentialData } from "@/types/openfoodfacts";

export default function isEssentialDataEmpty(data: EssentialData): boolean {
  // Check simple string fields
  if (!data.name || !data.brand || !data.image) {
    return true;
  }

  // Nutri-score check
  if (!data.nutriScore) {
    return true;
  }

  // Check all nutrition fields
  const nutritionValues = Object.values(data.nutrition);
  const allZero = nutritionValues.every((v) => v === 0);

  return allZero;
}
