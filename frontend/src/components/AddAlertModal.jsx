import { useState } from "react";
import { X } from "lucide-react";
import { useEffect } from "react";
import api from "../api/axios";

export default function AddAlertModal({ isOpen, onClose, onAdd }) {
  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [selectedSymbol, setSelectedSymbol] = useState("");
  const [targetPrice, setTargetPrice] = useState("");
  const [condition, setCondition] = useState("above");
  const [isSearching, setIsSearching] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setSearch("");
      setResults([]);
      setSelectedSymbol("");
      setTargetPrice("");
      setCondition("above");
    }
  }, [isOpen]);

  useEffect(() => {
    if (!search || search.length < 1) {
      setResults([]);
      return;
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true);
        // If api has baseURL = '/api', this hits '/api/symbols/search'
        const res = await api.get("/price/search", {
          params: { q: search },
        });
        setResults(res.data || []);
      } catch (err) {
        console.error(
          "Symbol search error:",
          err.response?.data || err.message
        );
      } finally {
        setIsSearching(false);
      }
    }, 400); // 400ms debounce

    return () => clearTimeout(timeoutId);
  }, [search]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSymbol && targetPrice) {
      onAdd(selectedSymbol.toUpperCase(), parseFloat(targetPrice), condition);
      handleClose();
    }
  };

  const handleClose = () => {
    setSearch("");
    setResults([]);
    setSelectedSymbol("");
    setTargetPrice("");
    setCondition("above");
    onClose();
  };

  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
    //   <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
    //     <div className="flex items-center justify-between p-6 border-b border-slate-200">
    //       <h3 className="text-xl font-bold text-slate-800">Create New Alert</h3>
    //       <button
    //         onClick={handleClose}
    //         className="text-slate-400 hover:text-slate-600 transition-colors"
    //       >
    //         <X className="w-6 h-6" />
    //       </button>
    //     </div>

    //     <form onSubmit={handleSubmit} className="p-6 space-y-5">
    //       <div>
    //         <label className="block text-sm font-medium text-slate-700 mb-2">
    //           Stock Symbol
    //         </label>

    //         <input
    //           type="text"
    //           value={search}
    //           onChange={(e) => setSearch(e.target.value)}
    //           className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //           placeholder="Type to search (e.g. INFY, TCS)"
    //         />

    //         <div className="mt-2 max-h-48 overflow-y-auto border border-slate-200 rounded-lg">
    //           {isSearching && (
    //             <div className="px-4 py-2 text-sm text-slate-500">
    //               Searching...
    //             </div>
    //           )}

    //           {!isSearching && results.length === 0 && search && (
    //             <div className="px-4 py-2 text-sm text-slate-400">
    //               No results
    //             </div>
    //           )}

    //           {results.map((item) => (
    //             <div
    //               key={item.symbol}
    //               onClick={() => {
    //                 setSelectedSymbol(item.symbol);
    //                 setSearch(`${item.symbol} - ${item.description}`);
    //                 setResults([]);
    //               }}
    //               className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
    //                 selectedSymbol === item.symbol ? "bg-blue-100" : ""
    //               }`}
    //             >
    //               <span className="font-medium">{item.symbol}</span>
    //               <span className="text-slate-500"> — {item.description}</span>
    //             </div>
    //           ))}
    //         </div>

    //         {selectedSymbol && (
    //           <p className="mt-1 text-xs text-slate-500">
    //             Selected:&nbsp;
    //             <span className="font-semibold">{selectedSymbol}</span>
    //           </p>
    //         )}
    //       </div>

    //       {/* TARGET PRICE (unchanged) */}
    //       <div>
    //         <label
    //           htmlFor="targetPrice"
    //           className="block text-sm font-medium text-slate-700 mb-2"
    //         >
    //           Target Price
    //         </label>
    //         <div className="relative">
    //           <span className="absolute left-4 top-3 text-slate-500">$</span>
    //           <input
    //             id="targetPrice"
    //             type="number"
    //             step="0.01"
    //             value={targetPrice}
    //             onChange={(e) => setTargetPrice(e.target.value)}
    //             className="w-full pl-8 pr-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    //             placeholder="0.00"
    //             required
    //           />
    //         </div>
    //       </div>

    //       {/* CONDITION BUTTONS (unchanged) */}
    //       <div>
    //         <label className="block text-sm font-medium text-slate-700 mb-3">
    //           Alert Condition
    //         </label>
    //         <div className="grid grid-cols-2 gap-3">
    //           <button
    //             type="button"
    //             onClick={() => setCondition("above")}
    //             className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
    //               condition === "above"
    //                 ? "border-blue-600 bg-blue-50 text-blue-700"
    //                 : "border-slate-200 text-slate-600 hover:border-slate-300"
    //             }`}
    //           >
    //             Above Target
    //           </button>
    //           <button
    //             type="button"
    //             onClick={() => setCondition("below")}
    //             className={`py-3 px-4 rounded-lg border-2 font-medium transition-all ${
    //               condition === "below"
    //                 ? "border-blue-600 bg-blue-50 text-blue-700"
    //                 : "border-slate-200 text-slate-600 hover:border-slate-300"
    //             }`}
    //           >
    //             Below Target
    //           </button>
    //         </div>
    //       </div>

    //       {/* FOOTER BUTTONS */}
    //       <div className="flex gap-3 pt-4">
    //         <button
    //           type="button"
    //           onClick={handleClose}
    //           className="flex-1 px-4 py-3 border border-slate-300 text-slate-700 font-medium rounded-lg hover:bg-slate-50 transition-colors"
    //         >
    //           Cancel
    //         </button>
    //         <button
    //           type="submit"
    //           disabled={!selectedSymbol || !targetPrice}
    //           className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
    //         >
    //           Create Alert
    //         </button>
    //       </div>
    //     </form>
    //   </div>
    // </div>
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div
        className="rounded-2xl shadow-2xl w-full max-w-md border"
        style={{
          background: "var(--bg-header)",
          borderColor: "var(--border-header)",
          color: "var(--text-primary)",
        }}
      >
        {/* Header */}
        <div
          className="flex items-center justify-between p-6 border-b"
          style={{ borderColor: "var(--border-header)" }}
        >
          <h3
            className="text-xl font-bold"
            style={{ color: "var(--text-primary)" }}
          >
            Create New Alert
          </h3>
          <button
            onClick={handleClose}
            className="transition-colors"
            style={{ color: "var(--text-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* STOCK SYMBOL */}
          <div>
            <label
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Stock Symbol
            </label>

            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[var(--text-muted)]"
              style={{
                borderColor: "var(--border-header)",
                background: "var(--bg-body)",
                color: "var(--text-primary)",
              }}
              placeholder="Type to search (e.g. INFY, TCS)"
            />

            <div
              className="mt-2 max-h-48 overflow-y-auto rounded-lg border"
              style={{
                borderColor: "var(--border-header)",
                background: "var(--bg-header)",
              }}
            >
              {isSearching && (
                <div
                  className="px-4 py-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  Searching...
                </div>
              )}

              {!isSearching && results.length === 0 && search && (
                <div
                  className="px-4 py-2 text-sm"
                  style={{ color: "var(--text-muted)" }}
                >
                  No results
                </div>
              )}

              {results.map((item) => (
                <div
                  key={item.symbol}
                  onClick={() => {
                    setSelectedSymbol(item.symbol);
                    setSearch(`${item.symbol} - ${item.description}`);
                    setResults([]);
                  }}
                  className="px-4 py-2 text-sm cursor-pointer"
                  style={{
                    color: "var(--text-primary)",
                    background:
                      selectedSymbol === item.symbol
                        ? "var(--button-bg-hover)"
                        : "transparent",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.background =
                      "var(--button-bg-hover)")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.background =
                      selectedSymbol === item.symbol
                        ? "var(--button-bg-hover)"
                        : "transparent")
                  }
                >
                  <span className="font-medium">{item.symbol}</span>
                  <span style={{ color: "var(--text-muted)" }}>
                    {" "}
                    — {item.description}
                  </span>
                </div>
              ))}
            </div>

            {selectedSymbol && (
              <p
                className="mt-1 text-xs"
                style={{ color: "var(--text-muted)" }}
              >
                Selected:&nbsp;
                <span
                  className="font-semibold"
                  style={{ color: "var(--text-primary)" }}
                >
                  {selectedSymbol}
                </span>
              </p>
            )}
          </div>

          {/* TARGET PRICE */}
          <div>
            <label
              htmlFor="targetPrice"
              className="block text-sm font-medium mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              Target Price
            </label>
            <div className="relative">
              <span
                className="absolute left-4 top-3 text-sm"
                style={{ color: "var(--text-muted)" }}
              >
                $
              </span>
              <input
                id="targetPrice"
                type="number"
                step="0.01"
                value={targetPrice}
                onChange={(e) => setTargetPrice(e.target.value)}
                className="w-full pl-8 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-[var(--text-muted)]"
                style={{
                  borderColor: "var(--border-header)",
                  background: "var(--bg-body)",
                  color: "var(--text-primary)",
                }}
                placeholder="0.00"
                required
              />
            </div>
          </div>

          {/* CONDITION BUTTONS */}
          <div>
            <label
              className="block text-sm font-medium mb-3"
              style={{ color: "var(--text-primary)" }}
            >
              Alert Condition
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setCondition("above")}
                className="py-3 px-4 rounded-lg border-2 font-medium transition-all"
                style={
                  condition === "above"
                    ? {
                        borderColor: "#2563eb",
                        background: "rgba(37,99,235,0.1)",
                        color: "#1d4ed8",
                      }
                    : {
                        borderColor: "var(--border-header)",
                        color: "var(--text-muted)",
                        background: "transparent",
                      }
                }
              >
                Above Target
              </button>

              <button
                type="button"
                onClick={() => setCondition("below")}
                className="py-3 px-4 rounded-lg border-2 font-medium transition-all"
                style={
                  condition === "below"
                    ? {
                        borderColor: "#2563eb",
                        background: "rgba(37,99,235,0.1)",
                        color: "#1d4ed8",
                      }
                    : {
                        borderColor: "var(--border-header)",
                        color: "var(--text-muted)",
                        background: "transparent",
                      }
                }
              >
                Below Target
              </button>
            </div>
          </div>

          {/* FOOTER BUTTONS */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={handleClose}
              className="flex-1 px-4 py-3 rounded-lg font-medium transition-colors border"
              style={{
                borderColor: "var(--border-header)",
                color: "var(--text-primary)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--button-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={!selectedSymbol || !targetPrice}
              className="flex-1 px-4 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-300"
            >
              Create Alert
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
