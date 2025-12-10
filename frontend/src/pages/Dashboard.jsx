/* eslint-disable react-hooks/immutability */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from "react";
import { Plus, Bell, BellOff } from "lucide-react";
import Header from "../components/Header";
import AlertCard from "../components/AlertCard";
import AddAlertModal from "../components/AddAlertModal";
import api from "../api/axios";

export default function Dashboard() {
  const [alerts, setAlerts] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchAlerts();
  }, []);

  const fetchAlerts = async () => {
    try {
      const res = await api.get("/alerts");
      setAlerts(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleAddAlert = async (symbol, targetPrice, condition) => {
    try {
      const res = await api.post("/alerts", {
        symbol,
        condition,
        targetPrice,
      });
      setAlerts((prev) => [res.data.alert, ...prev]);
      setIsModalOpen(false);
    } catch (error) {
      // console.error(error);
      console.error(
        "CREATE ALERT ERROR:",
        error.response?.data || error.message
      );
    }
  };

  const handleToggleAlert = async (id) => {
    const current = alerts.find((a) => a._id === id);
    try {
      const res = await api.put(`/alerts/${id}`, { active: !current.active });
      fetchAlerts();
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteAlert = async (id) => {
    try {
      await api.delete(`/alerts/${id}`);
      fetchAlerts();
    } catch (error) {
      console.error(error);
    }
  };

  const activeAlerts = alerts.filter((a) => a.active).length;
  const triggeredAlerts = alerts.filter((a) => {
    if (!a.active) return false;
    return (
      (a.condition === "above" && a.currentPrice >= a.targetPrice) ||
      (a.condition === "below" && a.currentPrice <= a.targetPrice)
    );
  }).length;

  return (
    // <div className="min-h-screen bg-slate-50">
    //   <Header />

    //   <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
    //     <div className="mb-8">
    //       <div className="flex items-center justify-between mb-6">
    //         <div>
    //           <h2 className="text-3xl font-bold text-slate-800">
    //             Stock Alerts
    //           </h2>
    //           <p className="text-slate-600 mt-1">
    //             Monitor and manage your price alerts
    //           </p>
    //         </div>
    //         <button
    //           onClick={() => setIsModalOpen(true)}
    //           className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-200"
    //         >
    //           <Plus className="w-5 h-5" />
    //           New Alert
    //         </button>
    //       </div>

    //       <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
    //         <div className="bg-white rounded-xl p-6 border border-slate-200">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <p className="text-slate-600 text-sm mb-1">Total Alerts</p>
    //               <p className="text-3xl font-bold text-slate-800">
    //                 {alerts.length}
    //               </p>
    //             </div>
    //             <div className="bg-blue-100 p-3 rounded-lg">
    //               <Bell className="w-6 h-6 text-blue-600" />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="bg-white rounded-xl p-6 border border-slate-200">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <p className="text-slate-600 text-sm mb-1">Active Alerts</p>
    //               <p className="text-3xl font-bold text-slate-800">
    //                 {activeAlerts}
    //               </p>
    //             </div>
    //             <div className="bg-green-100 p-3 rounded-lg">
    //               <Bell className="w-6 h-6 text-green-600" />
    //             </div>
    //           </div>
    //         </div>

    //         <div className="bg-white rounded-xl p-6 border border-slate-200">
    //           <div className="flex items-center justify-between">
    //             <div>
    //               <p className="text-slate-600 text-sm mb-1">Triggered</p>
    //               <p className="text-3xl font-bold text-slate-800">
    //                 {triggeredAlerts}
    //               </p>
    //             </div>
    //             <div className="bg-orange-100 p-3 rounded-lg">
    //               <BellOff className="w-6 h-6 text-orange-600" />
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </div>

    //     {alerts.length === 0 ? (
    //       <div className="bg-white rounded-xl border-2 border-dashed border-slate-300 p-12 text-center">
    //         <div className="bg-slate-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
    //           <Bell className="w-8 h-8 text-slate-400" />
    //         </div>
    //         <h3 className="text-xl font-semibold text-slate-800 mb-2">
    //           No alerts yet
    //         </h3>
    //         <p className="text-slate-600 mb-6">
    //           Create your first stock price alert to get started
    //         </p>
    //         <button
    //           onClick={() => setIsModalOpen(true)}
    //           className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
    //         >
    //           <Plus className="w-5 h-5" />
    //           Create Alert
    //         </button>
    //       </div>
    //     ) : (
    //       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    //         {alerts.map((alert) => (
    //           <AlertCard
    //             key={alert._id}
    //             alert={alert}
    //             onToggle={handleToggleAlert}
    //             onDelete={handleDeleteAlert}
    //           />
    //         ))}
    //       </div>
    //     )}
    //   </main>

    //   <AddAlertModal
    //     isOpen={isModalOpen}
    //     onClose={() => setIsModalOpen(false)}
    //     onAdd={handleAddAlert}
    //   />
    // </div>
    <div
      className="min-h-screen"
      style={{ background: "var(--bg-body)", color: "var(--text-primary)" }}
    >
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2
                className="text-3xl font-bold"
                style={{ color: "var(--text-primary)" }}
              >
                Stock Alerts
              </h2>
              <p className="mt-1" style={{ color: "var(--text-muted)" }}>
                Monitor and manage your price alerts
              </p>
            </div>
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors shadow-lg shadow-blue-500"
            >
              <Plus className="w-5 h-5" />
              New Alert
            </button>
          </div>

          {/* Stats cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--bg-header)",
                borderColor: "var(--border-header)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Total Alerts
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {alerts.length}
                  </p>
                </div>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <Bell className="w-6 h-6 text-blue-600" />
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--bg-header)",
                borderColor: "var(--border-header)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Active Alerts
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {activeAlerts}
                  </p>
                </div>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Bell className="w-6 h-6 text-green-600" />
                </div>
              </div>
            </div>

            <div
              className="rounded-xl p-6 border"
              style={{
                background: "var(--bg-header)",
                borderColor: "var(--border-header)",
              }}
            >
              <div className="flex items-center justify-between">
                <div>
                  <p
                    className="text-sm mb-1"
                    style={{ color: "var(--text-muted)" }}
                  >
                    Triggered
                  </p>
                  <p
                    className="text-3xl font-bold"
                    style={{ color: "var(--text-primary)" }}
                  >
                    {triggeredAlerts}
                  </p>
                </div>
                <div className="bg-orange-100 p-3 rounded-lg">
                  <BellOff className="w-6 h-6 text-orange-600" />
                </div>
              </div>
            </div>
          </div>
        </div>

        {alerts.length === 0 ? (
          <div
            className="rounded-xl border-2 border-dashed p-12 text-center"
            style={{
              background: "var(--bg-header)",
              borderColor: "var(--border-header)",
            }}
          >
            <div className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 bg-slate-100">
              <Bell className="w-8 h-8 text-slate-400" />
            </div>
            <h3
              className="text-xl font-semibold mb-2"
              style={{ color: "var(--text-primary)" }}
            >
              No alerts yet
            </h3>
            <p className="mb-6" style={{ color: "var(--text-muted)" }}>
              Create your first stock price alert to get started
            </p>
            <button
              onClick={() => setIsModalOpen(true)}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
            >
              <Plus className="w-5 h-5" />
              Create Alert
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {alerts.map((alert) => (
              <AlertCard
                key={alert._id}
                alert={alert}
                onToggle={handleToggleAlert}
                onDelete={handleDeleteAlert}
              />
            ))}
          </div>
        )}
      </main>

      <AddAlertModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onAdd={handleAddAlert}
      />
    </div>
  );
}
