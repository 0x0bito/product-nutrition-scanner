export type EssentialData = {
  name: string;
  brand: string;
  image: string;
  nutriScore: string | null;
  nutrition: {
    energy: number;
    fat: number;
    carbohydrates: number;
    "saturated-fat": number;
    sugars: number;
    proteins: number;
    salt: number;
  };
  scannedAt?: string | Date;
};

export type ProductHistoryEssentialData = {
  name: string;
  brand: string;
  nutriScore: string | null;
  nutrition: {
    energy: number;
    fat: number;
    carbohydrates: number;
    "saturated-fat": number;
    sugars: number;
    proteins: number;
    salt: number;
  };
  scannedAt: string | Date;
};
