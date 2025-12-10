/* eslint-disable no-unused-vars */
import { TrendingUp, LogOut, Sun, Moon } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import api from "../api/axios";
import { Link, useNavigate } from "react-router-dom";

export default function Header() {
  const { user, logout } = useAuth();

  const [search, setSearch] = useState("");
  const [results, setResults] = useState([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedSymbol, setSelectedSymbol] = useState(null);

  const { theme, toggleTheme, setLightTheme } = useTheme();

  const navigate = useNavigate();

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

  // 🔗 open detail page
  const goToDetail = (symbol) => {
    // adjust this path to match your routes, e.g. `/price/${symbol}`
    navigate(`/stock/${symbol}`);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (selectedSymbol) {
      goToDetail(selectedSymbol);
      return;
    }

    if (results.length > 0) {
      const first = results[0];
      setSelectedSymbol(first.symbol);
      setSearch(`${first.symbol} - ${first.description}`);
      setResults([]);
      goToDetail(first.symbol);
    }
  };

  return (
    // <header className="bg-white border-b border-slate-200">
    //   <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    //     <div className="flex items-center justify-between h-16 gap-4">
    //       {/* Left */}
    //       <div className="flex items-center gap-3">
    //         <div className="bg-blue-600 p-2 rounded-lg">
    //           <TrendingUp className="w-6 h-6 text-white" />
    //         </div>
    //         <h1 className="text-xl font-bold text-slate-800 hidden sm:block">
    //           Stock Alert System
    //         </h1>
    //       </div>

    //       {/* 🔍 Middle Search (responsive) */}
    //       <div className="flex-1 max-w-md ">
    //         <div className="relative">
    //           <input
    //             type="text"
    //             placeholder="Search stocks..."
    //             value={search}
    //             onChange={(e) => setSearch(e.target.value)}
    //             className="w-full border border-slate-300 rounded-lg py-2 px-3 text-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-400 outline-none bg-slate-50"
    //           />

    //           {/* Dropdown */}
    //           {search && (
    //             <div className="absolute z-50 mt-2 w-full bg-white border border-slate-200 rounded-lg max-h-48 overflow-y-auto shadow-sm">
    //               {isSearching && (
    //                 <div className="px-4 py-2 text-sm text-slate-500">
    //                   Searching...
    //                 </div>
    //               )}

    //               {!isSearching && results.length === 0 && search && (
    //                 <div className="px-4 py-2 text-sm text-slate-400">
    //                   No results
    //                 </div>
    //               )}

    //               {results.map((item) => (
    //                 <div
    //                   key={item.symbol}
    //                   onClick={() => {
    //                     setSelectedSymbol(item.symbol);
    //                     setSearch(`${item.symbol} - ${item.description}`);
    //                     setResults([]);
    //                     goToDetail(item.symbol);
    //                   }}
    //                   className={`px-4 py-2 text-sm cursor-pointer hover:bg-blue-50 ${
    //                     selectedSymbol === item.symbol ? "bg-blue-100" : ""
    //                   }`}
    //                 >
    //                   <span className="font-medium">{item.symbol}</span>
    //                   <span className="text-slate-500">
    //                     {" "}
    //                     — {item.description}
    //                   </span>
    //                 </div>
    //               ))}
    //             </div>
    //           )}
    //         </div>
    //       </div>

    //       {/* Right */}
    //       <div className="flex items-center gap-4">
    //         <div className="text-right">
    //           <p className="text-sm font-medium text-slate-800">{user?.name}</p>
    //           <p className="text-xs text-slate-500 hidden sm:block">{user?.email}</p>
    //         </div>
    //         <button
    //           onClick={logout}
    //           className="flex items-center gap-2 px-4 py-2 text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
    //           title="Logout"
    //         >
    //           <LogOut className="w-4 h-4" />
    //           <span className="text-sm font-medium hidden sm:block">Logout</span>
    //         </button>
    //       </div>
    //     </div>
    //   </div>
    // </header>
    <header
      className="border-b px-4 sm:px-6 lg:px-8"
      style={{
        background: "var(--bg-header)",
        borderColor: "var(--border-header)",
      }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Left */}
          <Link to="/">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 rounded-lg">
                <TrendingUp className="w-6 h-6 text-white" />
              </div>
              <h1
                className="text-xl font-bold hidden sm:block"
                style={{ color: "var(--text-primary)" }}
              >
                Stock Alert System
              </h1>
            </div>
          </Link>

          {/* Middle Search */}
          <div className="flex-1 max-w-md">
            <div className="relative">
              <input
                type="text"
                placeholder="Search stocks..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full border rounded-lg py-2 px-3 text-sm outline-none"
                style={{
                  borderColor: "var(--border-header)",
                  background: "var(--bg-header)",
                  color: "var(--text-primary)",
                }}
              />

              {/* Dropdown */}
              {search && (
                <div
                  className="absolute z-50 mt-2 w-full border rounded-lg max-h-48 overflow-y-auto shadow-sm"
                  style={{
                    background: "var(--bg-header)",
                    borderColor: "var(--border-header)",
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
                        goToDetail(item.symbol);
                      }}
                      className="px-4 py-2 text-sm cursor-pointer"
                      style={{
                        color: "var(--text-primary)",
                        background:
                          selectedSymbol === item.symbol
                            ? "var(--button-bg-hover)"
                            : "",
                      }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.background =
                          "var(--button-bg-hover)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.background =
                          selectedSymbol === item.symbol
                            ? "var(--button-bg-hover)"
                            : "")
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
              )}
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg border transition-colors"
              style={{
                borderColor: "var(--border-header)",
                color: "var(--text-primary)",
              }}
            >
              {theme === "dark" ? (
                <Sun className="w-5 h-5 text-yellow-400" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>

            <Link to={"/account"}>
              <div className="text-right">
                <p
                  className="text-sm font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {user?.name}
                </p>
                <p
                  className="text-xs hidden sm:block"
                  style={{ color: "var(--text-muted)" }}
                >
                  {user?.email}
                </p>
              </div>
            </Link>

            <button
              onClick={() => {
                setLightTheme();
                logout();
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-lg transition-colors"
              style={{
                color: "var(--button-text)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--button-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              <LogOut className="w-4 h-4" />
              <span className="text-sm font-medium hidden sm:block">
                Logout
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
