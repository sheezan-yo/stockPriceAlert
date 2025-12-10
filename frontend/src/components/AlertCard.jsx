/* eslint-disable no-unused-vars */
import {
  TrendingUp,
  TrendingDown,
  Trash2,
  ToggleLeft,
  ToggleRight,
} from "lucide-react";
import api from "../api/axios";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

export default function AlertCard({ alert, onToggle, onDelete }) {
  const [currentPrice, setCurrentPrice] = useState(alert.currentPrice || null);
  // const [loadingPrice, setLoadingPrice] = useState(true);
  // const [priceError, setPriceError] = useState("");

  useEffect(() => {
    let cancelled = false;

    const fetchPrice = async () => {
      try {
        const res = await api.get("/price", {
          params: { symbol: alert.symbol },
        });

        if (!cancelled) {
          setCurrentPrice(res.data.currentPrice);
        }
      } catch (error) {
        console.error(
          "Error fetching price:",
          error.response?.data || error.message
        );
      }
    };

    fetchPrice();

    const intervalId = setInterval(fetchPrice, 30000);

    return () => {
      cancelled = true;
      clearInterval(intervalId);
    };
  }, [alert.symbol]);

  const target = alert?.targetPrice != null ? Number(alert.targetPrice) : null;
  const current =
    currentPrice != null && !Number.isNaN(Number(currentPrice))
      ? Number(currentPrice)
      : null;

  const priceChange =
    current != null && target != null ? current - target : null;

  const priceChangePercent =
    priceChange != null && target ? (priceChange / target) * 100 : null;

  const isTriggered =
    current != null &&
    target != null &&
    ((alert.condition === "above" && current >= target) ||
      (alert.condition === "below" && current <= target));

  return (
    // <div
    //   className={`bg-white rounded-xl border-2 transition-all ${
    //     isTriggered && alert.active
    //       ? "border-green-500 shadow-lg shadow-green-100"
    //       : "border-slate-200 hover:border-slate-300"
    //   }`}
    // >
    //   <div className="p-6">
    //     <div className="flex items-start justify-between mb-4">
    //       <div className="flex items-center gap-3">
    //         <div
    //           className={`p-2 rounded-lg ${
    //             alert.condition === "above" ? "bg-green-100" : "bg-red-100"
    //           }`}
    //         >
    //           {alert.condition === "above" ? (
    //             <TrendingUp className="w-5 h-5 text-green-600" />
    //           ) : (
    //             <TrendingDown className="w-5 h-5 text-red-600" />
    //           )}
    //         </div>
    //         <div>
    //           <h3 className="text-xl font-bold text-slate-800">
    //             <Link
    //               to={`/stock/${encodeURIComponent(alert.symbol)}`}
    //               className="hover:underline"
    //             >
    //               {alert.symbol}
    //             </Link>
    //           </h3>
    //           <p className="text-sm text-slate-500 capitalize">
    //             Alert when {alert.condition}{" "}
    //             {target != null ? `$${target.toFixed(2)}` : "target price"}
    //           </p>
    //         </div>
    //       </div>

    //       <button
    //         onClick={() => onToggle(alert._id)}
    //         className="text-slate-400 hover:text-slate-600 transition-colors"
    //         title={alert.active ? "Disable Alert" : "Enable Alert"}
    //       >
    //         {alert.active ? (
    //           <ToggleRight className="w-8 h-8 text-blue-600" />
    //         ) : (
    //           <ToggleLeft className="w-8 h-8" />
    //         )}
    //       </button>
    //     </div>

    //     <div className="grid grid-cols-2 gap-4 mb-4">
    //       <div className="bg-slate-50 rounded-lg p-4">
    //         <p className="text-xs text-slate-500 mb-1">Current Price</p>
    //         <p className="text-2xl font-bold text-slate-800">
    //           {current != null ? `$${current.toFixed(2)}` : "N/A"}
    //         </p>
    //       </div>

    //       <div className="bg-slate-50 rounded-lg p-4">
    //         <p className="text-xs text-slate-500 mb-1">Change</p>
    //         <p
    //           className={`text-2xl font-bold ${
    //             priceChange >= 0 ? "text-green-600" : "text-red-600"
    //           }`}
    //         >
    //           {priceChange >= 0 ? "+" : ""}${Number(priceChange).toFixed(2)}
    //           <span className="text-sm ml-1">
    //             ({priceChangePercent >= 0 ? "+" : ""}
    //             {Math.abs(priceChangePercent).toFixed(2)}%)
    //           </span>
    //         </p>
    //       </div>
    //     </div>

    //     {isTriggered && alert.active && (
    //       <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
    //         <p className="text-sm font-medium text-green-800">
    //           Alert Triggered! Price is {alert.condition} target.
    //         </p>
    //       </div>
    //     )}

    //     <div className="flex items-center justify-between pt-4 border-t border-slate-200">
    //       <p className="text-xs text-slate-400">
    //         Created {new Date(alert.createdAt).toLocaleDateString()}
    //       </p>
    //       <button
    //         onClick={() => onDelete(alert._id)}
    //         className="flex items-center gap-2 px-3 py-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
    //       >
    //         <Trash2 className="w-4 h-4" />
    //         <span className="text-sm font-medium">Delete</span>
    //       </button>
    //     </div>
    //   </div>
    // </div>
    <div
      className="rounded-xl border-2 transition-all"
      style={{
        background: "var(--bg-header)",
        borderColor:
          isTriggered && alert.active ? "green" : "var(--border-header)",
        boxShadow:
          isTriggered && alert.active
            ? "0 4px 20px rgba(34, 197, 94, 0.3)"
            : "none",
      }}
    >
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          {/* Left symbol + condition */}
          <div className="flex items-center gap-3">
            <div
              className="p-2 rounded-lg"
              style={{
                background:
                  alert.condition === "above"
                    ? "rgba(34,197,94,0.15)"
                    : "rgba(239,68,68,0.15)",
              }}
            >
              {alert.condition === "above" ? (
                <TrendingUp className="w-5 h-5 text-green-600" />
              ) : (
                <TrendingDown className="w-5 h-5 text-red-600" />
              )}
            </div>

            <div>
              <h3
                className="text-xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                <Link
                  to={`/stock/${encodeURIComponent(alert.symbol)}`}
                  style={{ color: "var(--text-primary)" }}
                  className="hover:underline"
                >
                  {alert.symbol}
                </Link>
              </h3>

              <p
                className="text-sm capitalize"
                style={{ color: "var(--text-muted)" }}
              >
                Alert when {alert.condition}{" "}
                {target != null ? `$${target.toFixed(2)}` : "target price"}
              </p>
            </div>
          </div>

          {/* Toggle */}
          <button
            onClick={() => onToggle(alert._id)}
            className="transition-colors"
            style={{ color: "var(--text-muted)" }}
            title={alert.active ? "Disable Alert" : "Enable Alert"}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--text-primary)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--text-muted)")
            }
          >
            {alert.active ? (
              <ToggleRight className="w-8 h-8 text-blue-600" />
            ) : (
              <ToggleLeft className="w-8 h-8" />
            )}
          </button>
        </div>

        {/* Mini Stats */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div
            className="rounded-lg p-4"
            style={{
              background: "var(--bg-body)",
              border: `1px solid var(--border-header)`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Current Price
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {current != null ? `$${current.toFixed(2)}` : "N/A"}
            </p>
          </div>

          <div
            className="rounded-lg p-4"
            style={{
              background: "var(--bg-body)",
              border: `1px solid var(--border-header)`,
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Change
            </p>
            <p
              className="text-2xl font-bold"
              style={{ color: priceChange >= 0 ? "green" : "red" }}
            >
              {priceChange >= 0 ? "+" : ""}${Number(priceChange).toFixed(2)}
              <span
                style={{ color: "var(--text-muted)" }}
                className="text-sm ml-1"
              >
                ({priceChangePercent >= 0 ? "+" : ""}
                {Math.abs(priceChangePercent).toFixed(2)}%)
              </span>
            </p>
          </div>
        </div>

        {/* Triggered Ribbon */}
        {isTriggered && alert.active && (
          <div
            className="rounded-lg p-3 mb-4"
            style={{
              background: "rgba(34,197,94,0.15)",
              border: "1px solid rgba(34,197,94,0.45)",
            }}
          >
            <p className="text-sm font-medium text-green-600">
              Alert Triggered! Price is {alert.condition} target.
            </p>
          </div>
        )}

        {/* Footer */}
        <div
          className="flex items-center justify-between pt-4"
          style={{ borderTop: `1px solid var(--border-header)` }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Created {new Date(alert.createdAt).toLocaleDateString()}
          </p>

          <button
            onClick={() => onDelete(alert._id)}
            className="flex items-center gap-2 px-3 py-2 rounded-lg transition-colors"
            style={{ color: "red" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "rgba(239,68,68,0.15)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "transparent")
            }
          >
            <Trash2 className="w-4 h-4" />
            <span className="text-sm font-medium">Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
}
