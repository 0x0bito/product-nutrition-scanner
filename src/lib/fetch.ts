import { toast } from "sonner";
import type { EssentialData } from "@/types/openfoodfacts";
import { saveToHistory } from "./storage";
import isEssentialDataEmpty from "./isEssentialDataEmpty";
import type { RefObject } from "react";

export async function fetchProduct(
  barcode: string,
  setProductData: React.Dispatch<React.SetStateAction<EssentialData | null>>,
  setResultOverlay: React.Dispatch<React.SetStateAction<boolean>>,
  lastScannedRef: RefObject<string | null>,
) {
  const id = toast.loading("Fetching product nutrition values");
  try {
    const response = await fetch(
      `https://world.openfoodfacts.org/api/v2/product/${barcode}.json`,
    );
    // await new Promise((res) => setTimeout(() => res(1), 5000));
    toast.dismiss(id);
    lastScannedRef.current = null;

    if (!response.ok) {
      toast.error("Failed to fetch product");
      return;
    }

    const data = await response.json();
    if (data.status === 0 || !data.product) {
      toast.warning("Product not found");
      setProductData(null);
      return;
    }

    const product = data.product;
    const nutriments = product.nutriments || {};

    const essentialData: EssentialData = {
      // Basic info
      name: product.product_name || "Unknown Product",
      brand: product.brands || "Unknown Brand",
      image: product.image_url || product.image_front_url || "",

      // Nutri-Score (A-E rating)
      nutriScore: product.nutriscore_grade?.toUpperCase() || null,

      // Nutrition values (per 100g)
      nutrition: {
        energy: nutriments["energy-kcal"] || nutriments.energy_value || 0,
        fat: nutriments.fat || 0,
        carbohydrates: nutriments.carbohydrates || 0,
        "saturated-fat": nutriments["saturated-fat"] || 0,
        sugars: nutriments.sugars || 0,
        proteins: nutriments.proteins || 0,
        salt: nutriments.salt || 0,
      },
    };

    if (isEssentialDataEmpty(essentialData)) {
      toast.warning("Product data not found");
      return;
    }

    const newHistory = {
      ...essentialData,
      scannedAt: new Date(),
    };
    saveToHistory(newHistory);
    setProductData(essentialData);
    setResultOverlay(true);
  } catch (error) {
    console.log("Error fetching product", error);
  } finally {
    toast.dismiss(id);
  }
}
