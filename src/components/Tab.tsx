import History from "../../public/history.svg";
import ScanLine from "../../public/scanLine.svg";

type propsType = {
  activeTab: string;
  setActiveTab: React.Dispatch<React.SetStateAction<"scan" | "history">>;
};

export default function Tab({ activeTab, setActiveTab }: propsType) {
  return (
    <div className="fixed h-[65px] bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg">
      <div className="flex justify-around items-center h-16">
        {/* Scan Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("scan")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === "scan"
            ? "text-blue-500"
            : "text-gray-400 hover:text-gray-600"
            }`}
        >
          <ScanLine
            className={`w-6 h-6 ${activeTab === "scan" ? "stroke-2" : ""}`}
          />
          <span className="text-xs font-medium mt-1">Scan</span>
          {activeTab === "scan" && (
            <div className="absolute bottom-0 w-12 h-1 bg-blue-500 rounded-full" />
          )}
        </button>

        {/* History Tab */}
        <button
          type="button"
          onClick={() => setActiveTab("history")}
          className={`flex flex-col items-center justify-center flex-1 h-full transition-colors ${activeTab === "history"
            ? "text-blue-500"
            : "text-gray-400 hover:text-gray-600"
            }`}
        >
          <History
            className={`w-6 h-6 ${activeTab === "history" ? "stroke-2" : ""}`}
          />
          <span className="text-xs font-medium mt-1">History</span>
          {activeTab === "history" && (
            <div className="absolute bottom-0 w-12 h-1 bg-blue-500 rounded-full" />
          )}
        </button>
      </div>
    </div>
  );
}
