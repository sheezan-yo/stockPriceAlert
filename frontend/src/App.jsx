import { useState } from "react";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import StockDetail from "./pages/StockDetail";
import UserAccount from "./pages/UserAccount";

function AppContent() {
  const { user } = useAuth();
  const [showRegister, setShowRegister] = useState(false);

  if (!user) {
    return showRegister ? (
      <Register onSwitchToLogin={() => setShowRegister(false)} />
    ) : (
      <Login onSwitchToRegister={() => setShowRegister(true)} />
    );
  }

  return (
    <Routes>
      {/* Dashboard at root */}
      <Route path="/" element={<Dashboard />} />

      {/* Stock detail page, e.g. /stock/INFY.NS */}
      <Route path="/stock/:symbol" element={<StockDetail />} />

      {/* User account info */}
      <Route path="/account" element={<UserAccount />} />

      {/* anything else → redirect to dashboard */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
