"use client";

import { useEffect, useRef } from "react";
import {
  getMetric,
  getNutritionColor,
  getNutritionScoreColor,
} from "@/lib/metrics";
import type { EssentialData } from "@/types/openfoodfacts";

type propsType = {
  resultOverlay: boolean;
  isSwipedUp: boolean;
  setResultOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSwipedUp: React.Dispatch<React.SetStateAction<boolean>>;
  productData: EssentialData | null;
};

export default function ResultOverlay({
  resultOverlay,
  setResultOverlay,
  isSwipedUp,
  setIsSwipedUp,
  productData,
}: propsType) {
  const resultOverlayRef = useRef<HTMLDivElement>(null);
  const startY = useRef<number | null>(null);
  const debounceTimeout = useRef<NodeJS.Timeout | null>(null);

  let number = 1;
  const handleClickOutside = (event: MouseEvent) => {
    if (
      resultOverlayRef.current &&
      event.target instanceof Node &&
      !resultOverlayRef?.current.contains(event.target)
    ) {
      if (number % 2 === 0) {
        setResultOverlay(false);
        setIsSwipedUp(false);
      }
      number++;
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(handleClickOutside): suppress dependency a
  useEffect(() => {
    document.addEventListener("click", handleClickOutside);
    return () => removeEventListener("click", handleClickOutside);
  }, []);

  const handleTouchStart = (e: TouchEvent) => {
    startY.current = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (startY.current) {
      e.preventDefault();
    }
  };

  const handleTouchEnd = (e: TouchEvent) => {
    if (startY.current) {
      const endY = e.changedTouches[0].clientY;
      const diff = startY.current - endY;

      if (diff > 50) {
        setIsSwipedUp(true);
      } else if (diff < -50) {
        setIsSwipedUp(false);
      }
    }
    startY.current = null;
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies(resultOverlay): suppress dependency a
  // biome-ignore lint/correctness/useExhaustiveDependencies(handleTouchEnd): suppress dependency a
  // biome-ignore lint/correctness/useExhaustiveDependencies(handleTouchStart): suppress dependency a
  // biome-ignore lint/correctness/useExhaustiveDependencies(handleTouchMove): suppress dependency a
  useEffect(() => {
    const overlay = resultOverlayRef.current;
    if (!overlay) {
      return;
    }

    // Swipe gesture
    overlay.addEventListener("touchstart", handleTouchStart, {
      passive: false,
    });
    overlay.addEventListener("touchmove", handleTouchMove, { passive: false });
    overlay.addEventListener("touchend", handleTouchEnd, { passive: false });

    return () => {
      overlay.removeEventListener("touchstart", handleTouchStart);
      overlay.removeEventListener("touchmove", handleTouchMove);
      overlay.removeEventListener("touchend", handleTouchEnd);
      if (debounceTimeout.current) {
        clearTimeout(debounceTimeout.current);
      }
    };
  }, [resultOverlay]);

  return (
    <div
      ref={resultOverlayRef}
      className={`z-50 shadow-2xl shadow-black absolute left-0 bg-gray-100 w-full min-h-[150px] rounded-t-4xl flex flex-col justify-center items-center ${
        isSwipedUp ? "space-y-4" : ""
      }`}
      style={{
        bottom: resultOverlay ? 0 : -300,
        opacity: resultOverlay ? 1 : 0,
        visibility: resultOverlay ? "visible" : "hidden",
        transition: "all 0.4s ease",
      }}
    >
      {!isSwipedUp && (
        <>
          <div className="arrows-container">
            <div className="arrow"></div>
          </div>
          <span className="absolute top-2 left-[50%] translate-x-[-50%] w-[40px] h-[2.5px] bg-gray-400 rounded-full"></span>
        </>
      )}
      <div className="mt-6 space-y-1">
        <p
          className={`text-center font-semibold ${
            isSwipedUp ? "text-xl" : "text-2xl"
          }`}
        >
          {productData?.name}
        </p>
        <p className="text-center font-medium text-lg">{productData?.brand}</p>
      </div>

      {
        <div
          className="w-full bg-white"
          style={{
            height: isSwipedUp ? "450px" : 0,
            bottom: isSwipedUp ? 0 : -1500,
            opacity: isSwipedUp ? 1 : 0,
            visibility: isSwipedUp ? "visible" : "hidden",
            transition: "all 0.3s ease-out",
          }}
        >
          {/* Nutrition Score */}
          <div className="bg-white px-2 py-4 space-y-2">
            <p className="font-medium text-lg">Nutrition Score</p>
            <div className="flex items-center gap-4">
              {["A", "B", "C", "D", "E"].map((score) => (
                <div
                  key={score}
                  className={`w-[40px] h-[40px] ${
                    score === productData?.nutriScore
                      ? getNutritionScoreColor(productData.nutriScore)
                      : "bg-gray-300"
                  } text-white rounded-lg flex items-center justify-center text-lg font-semibold p-6`}
                >
                  {score}
                </div>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 w-full h-[10px]"></div>
          {/* Nutrition Values */}
          <div className="bg-white p-2 space-y-2">
            <p className="space-x-2 text-lg">
              Nutrition per <span className="font-semibold">100g</span>
            </p>
            {/* Values */}
            <div className="space-y-4">
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
                  className="flex justify-between items-center w-full"
                >
                  <p className="flex items-center justify-center gap-2 font-semibold capitalize">
                    <span
                      className={`block w-[10px] h-[10px] rounded-full ${
                        productData?.nutrition &&
                        getNutritionColor(
                          nutrition,
                          productData?.nutrition[nutrition],
                        )
                      } `}
                    ></span>
                    {nutrition}
                  </p>
                  <p>
                    {productData?.nutrition[nutrition].toFixed(2)}
                    {getMetric(nutrition)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      }
    </div>
  );
}
