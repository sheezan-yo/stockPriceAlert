import { ArrowLeft } from "lucide-react";
import Header from "../components/Header";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";
import { Link } from "react-router-dom";

function UserAccount() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme, setLightTheme } = useTheme();

  const handleLogout = () => {
    // reset theme to light when logging out
    setLightTheme();
    logout();
  };

  return (
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-body)", color: "var(--text-primary)" }}
    >
      <Header />

      {/* Back Button */}
      <div className="max-w-3xl mx-auto px-2 sm:px-4 lg:px-6 mt-6">
        <Link
          to="/dashboard"
          className="inline-flex items-center text-sm transition-colors"
          style={{ color: "var(--text-muted)" }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = "var(--text-primary)")
          }
          onMouseLeave={(e) =>
            (e.currentTarget.style.color = "var(--text-muted)")
          }
        >
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back to Dashboard
        </Link>
      </div>

      <main className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-7 space-y-8">
        <section>
          <h1 className="text-2xl font-bold mb-2">Account</h1>
          <p style={{ color: "var(--text-muted)" }} className="text-sm">
            View and manage your account information.
          </p>
        </section>

        {/* Account info card */}
        <section
          className="rounded-2xl border p-6 space-y-4"
          style={{
            background: "var(--bg-header)",
            borderColor: "var(--border-header)",
          }}
        >
          <h2 className="text-lg font-semibold">Profile</h2>

          <div className="space-y-3 text-sm">
            <div>
              <p style={{ color: "var(--text-muted)" }}>Name</p>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.name || "—"}
              </p>
            </div>

            <div>
              <p style={{ color: "var(--text-muted)" }}>Email</p>
              <p
                className="font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                {user?.email || "—"}
              </p>
            </div>

            {user?.createdAt && (
              <div>
                <p style={{ color: "var(--text-muted)" }}>Joined</p>
                <p
                  className="font-medium"
                  style={{ color: "var(--text-primary)" }}
                >
                  {new Date(user.createdAt).toLocaleDateString()}
                </p>
              </div>
            )}
          </div>
        </section>

        {/* Preferences */}
        <section
          className="rounded-2xl border p-6 space-y-4"
          style={{
            background: "var(--bg-header)",
            borderColor: "var(--border-header)",
          }}
        >
          <h2 className="text-lg font-semibold">Preferences</h2>

          <div className="flex items-center justify-between">
            <div>
              <p
                className="text-sm font-medium"
                style={{ color: "var(--text-primary)" }}
              >
                Theme
              </p>
              <p className="text-xs" style={{ color: "var(--text-muted)" }}>
                Current: {theme === "dark" ? "Dark" : "Light"}
              </p>
            </div>

            <button
              type="button"
              onClick={toggleTheme}
              className="px-4 py-2 rounded-lg text-sm font-medium transition-colors border"
              style={{
                borderColor: "var(--border-header)",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--button-bg-hover)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "transparent")
              }
            >
              Toggle Theme
            </button>
          </div>
        </section>

        {/* Danger / Logout */}
        <section
          className="rounded-2xl border p-6 flex items-center justify-between"
          style={{
            background: "var(--bg-header)",
            borderColor: "var(--border-header)",
          }}
        >
          <div>
            <p
              className="text-sm font-semibold"
              style={{ color: "var(--text-primary)" }}
            >
              Logout
            </p>
            <p className="text-xs" style={{ color: "var(--text-muted)" }}>
              You will be signed out and theme will reset to light mode.
            </p>
          </div>

          <button
            onClick={handleLogout}
            className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Logout
          </button>
        </section>
      </main>
    </div>
  );
}

export default UserAccount;
