export function getMetric(nutrition: string): string {
  switch (nutrition) {
    case "energy":
      return "kcal";
    case "fat":
    case "carbohydrates":
    case "saturated-fat":
    case "sugars":
    case "proteins":
    case "salt":
      return "g";
    default:
      return "";
  }
}

export function getNutritionScoreColor(score: string): string {
  if (score === "A") {
    return "bg-green-500";
  }
  if (score === "B") {
    return "bg-lime-400";
  }
  if (score === "C") {
    return "bg-yellow-400";
  }
  if (score === "D") {
    return "bg-orange-500";
  }
  if (score === "E") {
    return "bg-red-500";
  }
  return "bg-gray-300";
}

export function getNutritionColor(nutrient: string, value: number): string {
  switch (nutrient) {
    case "fat":
      if (value <= 3) return "bg-green-500";
      if (value <= 17.5) return "bg-yellow-500";
      return "bg-red-500";

    case "sugars":
      if (value <= 5) return "bg-green-500";
      if (value <= 22.5) return "bg-yellow-500";
      return "bg-red-500";

    case "salt":
      if (value <= 0.3) return "bg-green-500";
      if (value <= 1.5) return "bg-yellow-500";
      return "bg-red-500";

    case "saturated-fat":
      if (value <= 1.5) return "bg-green-500";
      if (value <= 5) return "bg-yellow-500";
      return "bg-red-500";

    case "proteins":
      return "bg-green-500";

    case "carbohydrates":
    case "energy":
      return "bg-gray-200";

    default:
      return "bg-gray-200";
  }
}
