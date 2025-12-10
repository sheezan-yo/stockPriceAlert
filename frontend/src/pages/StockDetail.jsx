import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft, ExternalLink } from "lucide-react";
import api from "../api/axios"; // your axios instance
import Header from "../components/Header";

export default function StockDetail() {
  const { symbol } = useParams();
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadDetails = async () => {
      try {
        setLoading(true);
        setError("");

        const res = await api.get(`/price/${encodeURIComponent(symbol)}`);
        setDetails(res.data || null);
      } catch (err) {
        console.error("Error loading stock detail:", err);
        setError(
          err.response?.data?.message || "Failed to load stock details."
        );
      } finally {
        setLoading(false);
      }
    };

    if (symbol) {
      loadDetails();
    }
  }, [symbol]);

  if (loading && !details) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-slate-600">Loading stock details...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <div className="mb-4">
          <Link
            to="/"
            className="inline-flex items-center text-slate-500 hover:text-slate-700"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to dashboard
          </Link>
        </div>
        <p className="text-red-600">{error}</p>
      </div>
    );
  }

  if (!details) {
    return (
      <div className="p-6 max-w-5xl mx-auto">
        <p className="text-slate-600">No details available.</p>
      </div>
    );
  }

  const {
    name,
    exchange,
    currency,
    country,
    logo,
    weburl,
    industry,
    marketCap,
    ipo,
    currentPrice,
    change,
    changePercent,
    prevClose,
    high,
    low,
  } = details;

  const isUp = (change ?? 0) >= 0;

  return (
    // <div className="min-h-screen bg-slate-50">
    //   <Header />
    //   <div className="p-6 max-w-5xl mx-auto space-y-6">
    //     <div className="flex items-center justify-between gap-4">
    //       <div className="flex items-center gap-4">
    //         <Link
    //           to="/"
    //           className="inline-flex items-center text-slate-500 hover:text-slate-700"
    //         >
    //           <ArrowLeft className="w-4 h-4 mr-1" />
    //           Back
    //         </Link>

    //         {logo && (
    //           <img
    //             src={logo}
    //             alt={symbol}
    //             className="w-10 h-10 rounded-full border border-slate-200"
    //           />
    //         )}

    //         <div>
    //           <h1 className="text-2xl font-bold text-slate-900 flex items-center gap-2">
    //             {name || symbol}
    //             <span className="text-sm font-medium text-slate-500">
    //               ({symbol})
    //             </span>
    //           </h1>
    //           <p className="text-xs text-slate-500">
    //             {exchange} · {country} {industry && <>· {industry}</>}
    //           </p>
    //         </div>
    //       </div>

    //       {weburl && (
    //         <a
    //           href={weburl}
    //           target="_blank"
    //           rel="noreferrer"
    //           className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border border-slate-200 text-sm text-slate-700 hover:bg-slate-50"
    //         >
    //           Website
    //           <ExternalLink className="w-4 h-4" />
    //         </a>
    //       )}
    //     </div>

    //     {/* Summary cards */}
    //     <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //       {/* Price */}
    //       <div className="bg-white rounded-xl border border-slate-200 p-4">
    //         <p className="text-xs text-slate-500 mb-1">Current Price</p>
    //         <p className="text-3xl font-bold text-slate-900">
    //           {currentPrice != null
    //             ? `${currentPrice.toFixed(2)} ${currency || ""}`
    //             : "N/A"}
    //         </p>
    //         <p
    //           className={`text-sm mt-1 ${
    //             isUp ? "text-green-600" : "text-red-600"
    //           }`}
    //         >
    //           {change != null ? (
    //             <>
    //               {isUp ? "+" : ""}
    //               {change.toFixed(2)} (
    //               {changePercent != null
    //                 ? `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(
    //                     2
    //                   )}%`
    //                 : "—"}
    //               )
    //             </>
    //           ) : (
    //             "—"
    //           )}
    //         </p>
    //         <p className="text-xs text-slate-500 mt-1">
    //           Prev close: {prevClose != null ? prevClose.toFixed(2) : "N/A"}
    //         </p>
    //       </div>

    //       {/* Day range */}
    //       <div className="bg-white rounded-xl border border-slate-200 p-4">
    //         <p className="text-xs text-slate-500 mb-1">Day Range</p>
    //         <p className="text-sm text-slate-700">
    //           Low:{" "}
    //           <span className="font-semibold">
    //             {low != null ? low.toFixed(2) : "N/A"}
    //           </span>
    //         </p>
    //         <p className="text-sm text-slate-700">
    //           High:{" "}
    //           <span className="font-semibold">
    //             {high != null ? high.toFixed(2) : "N/A"}
    //           </span>
    //         </p>
    //       </div>

    //       {/* Fundamentals */}
    //       <div className="bg-white rounded-xl border border-slate-200 p-4">
    //         <p className="text-xs text-slate-500 mb-1">Fundamentals</p>
    //         <p className="text-sm text-slate-700">
    //           Market Cap:{" "}
    //           <span className="font-semibold">
    //             {marketCap != null ? `${marketCap.toFixed(2)} B` : "N/A"}
    //           </span>
    //         </p>
    //         <p className="text-sm text-slate-700">
    //           IPO: <span className="font-semibold">{ipo || "N/A"}</span>
    //         </p>
    //       </div>
    //     </div>

    //     {/* Info note */}
    //     <div className="bg-slate-50 border border-slate-200 rounded-xl p-4">
    //       <p className="text-xs text-slate-500">
    //         Price history chart is not available with the current data provider
    //         plan. Alerts and real-time prices will still work normally.
    //       </p>
    //     </div>
    //   </div>
    // </div>
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-body)", color: "var(--text-primary)" }}
    >
      <Header />

      <div className="p-6 max-w-5xl mx-auto space-y-6">
        {/* Top section */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Back link */}
            <Link
              to="/"
              className="inline-flex items-center text-sm"
              style={{ color: "var(--text-muted)" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.color = "var(--text-primary)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.color = "var(--text-muted)")
              }
            >
              <ArrowLeft className="w-4 h-4 mr-1" />
              Back
            </Link>

            {/* Logo */}
            {logo && (
              <img
                src={logo}
                alt={symbol}
                className="w-10 h-10 rounded-full border"
                style={{ borderColor: "var(--border-header)" }}
              />
            )}

            {/* Name + meta */}
            <div>
              <h1
                className="text-2xl font-bold flex items-center gap-2"
                style={{ color: "var(--text-primary)" }}
              >
                {name || symbol}
                <span
                  className="text-sm font-medium"
                  style={{ color: "var(--text-muted)" }}
                >
                  ({symbol})
                </span>
              </h1>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                {exchange} · {country} {industry && <>· {industry}</>}
              </p>
            </div>
          </div>

          {/* Website button */}
          {weburl && (
            <a
              href={weburl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1 px-3 py-2 rounded-lg border text-sm transition-colors"
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
              Website
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>

        {/* Summary cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Price */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: "var(--bg-header)",
              borderColor: "var(--border-header)",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Current Price
            </p>
            <p
              className="text-3xl font-bold"
              style={{ color: "var(--text-primary)" }}
            >
              {currentPrice != null
                ? `${currentPrice.toFixed(2)} ${currency || ""}`
                : "N/A"}
            </p>
            <p
              className="text-sm mt-1"
              style={{ color: isUp ? "green" : "red" }}
            >
              {change != null ? (
                <>
                  {isUp ? "+" : ""}
                  {change.toFixed(2)} (
                  {changePercent != null
                    ? `${changePercent >= 0 ? "+" : ""}${changePercent.toFixed(
                        2
                      )}%`
                    : "—"}
                  )
                </>
              ) : (
                "—"
              )}
            </p>
            <p className="text-xs mt-1" style={{ color: "var(--text-muted)" }}>
              Prev close: {prevClose != null ? prevClose.toFixed(2) : "N/A"}
            </p>
          </div>

          {/* Day range */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: "var(--bg-header)",
              borderColor: "var(--border-header)",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Day Range
            </p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              Low:{" "}
              <span className="font-semibold">
                {low != null ? low.toFixed(2) : "N/A"}
              </span>
            </p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              High:{" "}
              <span className="font-semibold">
                {high != null ? high.toFixed(2) : "N/A"}
              </span>
            </p>
          </div>

          {/* Fundamentals */}
          <div
            className="rounded-xl border p-4"
            style={{
              background: "var(--bg-header)",
              borderColor: "var(--border-header)",
            }}
          >
            <p className="text-xs mb-1" style={{ color: "var(--text-muted)" }}>
              Fundamentals
            </p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              Market Cap:{" "}
              <span className="font-semibold">
                {marketCap != null ? `${marketCap.toFixed(2)} B` : "N/A"}
              </span>
            </p>
            <p className="text-sm" style={{ color: "var(--text-primary)" }}>
              IPO: <span className="font-semibold">{ipo || "N/A"}</span>
            </p>
          </div>
        </div>

        {/* Info note */}
        <div
          className="rounded-xl border p-4"
          style={{
            background: "var(--bg-body)",
            borderColor: "var(--border-header)",
          }}
        >
          <p className="text-xs" style={{ color: "var(--text-muted)" }}>
            Price history chart is not available with the current data provider
            plan. Alerts and real-time prices will still work normally.
          </p>
        </div>
      </div>
    </div>
  );
}
