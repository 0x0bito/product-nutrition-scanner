"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import HistoryTab from "@/components/HistoryTab";
import ScanTab from "@/components/ScanTab";
import Tab from "@/components/Tab";
import { fetchProduct } from "@/lib/fetch";
import type { EssentialData } from "@/types/openfoodfacts";

export default function Home() {
  const [activeTab, setActiveTab] = useState<"scan" | "history">("scan");
  const [resultOverlay, setResultOverlay] = useState(false);
  const [isSwipedUp, setIsSwipedUp] = useState(false);
  const scannerRef = useRef<HTMLDivElement>(null);
  const [isScanning, setIsScanning] = useState(false);
  const [productData, setProductData] = useState<EssentialData | null>(null);

  useEffect(() => {
    if (!isScanning) {
      return;
    }

    import("@ericblade/quagga2").then((Quagg2Module) => {
      const Quagga = Quagg2Module.default;

      Quagga.init(
        {
          inputStream: {
            type: "LiveStream",
            target: scannerRef.current as string | Element | undefined,
            constraints: {
              width: 640,
              height: 480,
              facingMode: "environment",
            },
          },
          decoder: {
            readers: [
              "ean_reader",
              "upc_reader",
              "code_128_reader",
              "code_39_reader",
            ],
          },
          locator: {
            patchSize: "medium",
            halfSample: false,
          },
          locate: true,
        },
        (err) => {
          if (err) {
            toast.error("Failed to access camera");
            setIsScanning(false);
            return;
          }
          Quagga.start();
        },
      );
      Quagga.onDetected((result) => {
        const code = result.codeResult.code;
        setIsScanning(false);
        Quagga.stop();
        fetchProduct(code as string, setProductData, setResultOverlay);
      });
    });

    return () => {
      import("@ericblade/quagga2").then((Quagga2Module) => {
        const Quagga = Quagga2Module.default;
        Quagga.stop();
      });
    };
  }, [isScanning]);

  return (
    <main className="relative w-full h-dvh px-4 pt-8 pb-4 overflow-hidden">
      {activeTab === "scan" && (
        <ScanTab
          isScanning={isScanning}
          setIsScanning={setIsScanning}
          scannerRef={scannerRef}
          resultOverlay={resultOverlay}
          setResultOverlay={setResultOverlay}
          isSwipedUp={isSwipedUp}
          setIsSwipedUp={setIsSwipedUp}
          productData={productData}
        />
      )}

      {activeTab === "history" && <HistoryTab />}

      {/* Tab */}
      <Tab activeTab={activeTab} setActiveTab={setActiveTab} />
    </main>
  );
}
