import type { RefObject } from "react";
import type { EssentialData } from "@/types/openfoodfacts";
import Camera from "../../public/camera.svg";
import ResultOverlay from "./ResultOverlay";

type propsType = {
  isScanning: boolean;
  setIsScanning: React.Dispatch<React.SetStateAction<boolean>>;
  scannerRef: RefObject<HTMLDivElement | null>;

  resultOverlay: boolean;
  isSwipedUp: boolean;
  setResultOverlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSwipedUp: React.Dispatch<React.SetStateAction<boolean>>;
  productData: EssentialData | null;
};

export default function ScanTab({
  isScanning,
  setIsScanning,
  scannerRef,
  resultOverlay,
  setResultOverlay,
  isSwipedUp,
  setIsSwipedUp,
  productData,
}: propsType) {
  const handleStartScan = () => {
    setIsScanning(true);
  };

  const handleStopScan = () => {
    setIsScanning(false);
  };

  return (
    <>
      <h1 className="text-4xl font-semibold text-center">Nutrition Scanner</h1>
      <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex flex-col justify-center items-center gap-4">
        <div
          className={`overflow-hidden w-[300px] h-[250px] bg-gray-100 border-gray-400 ${
            !isScanning ? "border-2 border-dashed" : ""
          } rounded-xl flex flex-col justify-center items-center`}
        >
          {!isScanning && (
            <>
              <Camera className="text-gray-400 size-20 stroke-1" />
              <span className="text-gray-500 font-medium text-sm">
                Point camera at product barcode
              </span>
            </>
          )}
          {isScanning && (
            <div ref={scannerRef} className="w-full h-full rounded-xl" />
          )}
        </div>

        {isScanning ? (
          <button
            type="button"
            className="flex items-center justify-center bg-red-500 text-white py-4 px-8 rounded-full gap-2 font-semibold hover:bg-red-600 transition-colors ease-out cursor-pointer"
            onClick={handleStopScan}
          >
            <Camera className="text-white size-6 stroke-2" />
            STOP SCAN
          </button>
        ) : (
          <button
            type="button"
            className="flex items-center justify-center bg-blue-500 text-white py-4 px-8 rounded-full gap-2 font-semibold hover:bg-blue-600 transition-colors ease-out cursor-pointer"
            onClick={handleStartScan}
          >
            <Camera className="text-white size-6 stroke-2" />
            SCAN PRODUCT
          </button>
        )}
      </div>

      <ResultOverlay
        resultOverlay={resultOverlay}
        setResultOverlay={setResultOverlay}
        isSwipedUp={isSwipedUp}
        setIsSwipedUp={setIsSwipedUp}
        productData={productData}
      />
    </>
  );
}
