import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { InteractiveTerminal } from "@/components/terminal/InteractiveTerminal";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";
import { TacticalMap } from "@/components/visuals/TacticalMap";

const Index = () => {
  const navigate = useNavigate();
  const [timestamp, setTimestamp] = useState("");

  useEffect(() => {
    const updateTimestamp = () => {
      const now = new Date();
      const formatted = `${now.getUTCFullYear()}-${String(now.getUTCMonth() + 1).padStart(2, '0')}-${String(now.getUTCDate()).padStart(2, '0')} ${String(now.getUTCHours()).padStart(2, '0')}:${String(now.getUTCMinutes()).padStart(2, '0')}:${String(now.getUTCSeconds()).padStart(2, '0')} UTC`;
      setTimestamp(formatted);
    };

    updateTimestamp();
    const interval = setInterval(updateTimestamp, 1000);

    return () => clearInterval(interval);
  }, []);

  const menuItems = [
    { name: "PERSONNEL FILE", route: "/personnel-file", desc: "ACCESS PERSONNEL RECORDS" },
    { name: "TRAINING MODULES", route: "/training-modules", desc: "INITIATE TRAINING SIMULATION" },
    { name: "MISSION BRIEFING", route: "/mission-briefing", desc: "VIEW ACTIVE OBJECTIVES" },
    { name: "SKILL HEATMAP", route: "/tactical-radar", desc: "ANALYZE OPERATIVE METRICS" },
    { name: "SURVEILLANCE HUB", route: "/surveillance", desc: "LIVE CCTV FEED NETWORK" },
    { name: "TARGET DOSSIER", route: "/targets", desc: "HIGH VALUE TARGET DATABASE" },
    { name: "DECRYPTION", route: "/decryption", desc: "SECURE DATA EXTRACTION" },
  ];

  return (
    <div className="min-h-screen text-green-500 p-4 md:p-6 flex flex-col font-mono text-sm relative z-10">
      {/* Top Classification Bar */}
      <div className="border-b border-green-500/30 pb-2 mb-4 backdrop-blur-sm bg-black/20">
        <div className="flex justify-between items-start text-xs md:text-sm">
          <div className="space-y-1">
            <p className="text-green-400 font-bold tracking-widest animate-pulse">CLASSIFICATION: SECRET // NOFORN</p>
            <p className="text-green-600">SESSION ID: CDS-{Math.random().toString(36).substring(2, 9).toUpperCase()}-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-green-600">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tighter mb-2 text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-600 drop-shadow-[0_0_10px_rgba(0,255,0,0.5)]">
          CADETOPS // MISSION CONTROL
        </h1>
        <div className="flex gap-4 text-xs text-green-600/80">
          <span className="border border-green-500/30 px-2 py-0.5 rounded">ACCESS: GRANTED</span>
          <span className="border border-green-500/30 px-2 py-0.5 rounded">ENCRYPTION: AES-256</span>
          <span className="border border-green-500/30 px-2 py-0.5 rounded">NODE: ALPHA-1</span>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Left Column - Main Menu */}
        <div className="lg:col-span-2 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {menuItems.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card
                  className="bg-black/40 border-green-500/30 text-green-500 hover:bg-green-900/20 transition-all duration-300 cursor-pointer group relative overflow-hidden"
                  onClick={() => navigate(item.route)}
                >
                  <div className="absolute inset-0 bg-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                  <div className="p-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-xs text-green-700 font-bold">OP-{String(index + 1).padStart(2, '0')}</span>
                      <div className="w-2 h-2 bg-green-500/30 rounded-full group-hover:bg-green-400 group-hover:shadow-[0_0_8px_rgba(0,255,0,0.8)] transition-all" />
                    </div>
                    <h3 className="text-lg font-bold mb-1 group-hover:text-green-300 transition-colors">{item.name}</h3>
                    <p className="text-xs text-green-600/80">{item.desc}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Terminal Section */}
          <div className="mt-6">
            <div className="flex items-center gap-2 mb-2">
              <div className="w-2 h-2 bg-green-500 animate-pulse" />
              <h2 className="text-sm font-bold tracking-wider text-green-400">LIVE TERMINAL UPLINK</h2>
            </div>
            <InteractiveTerminal />
          </div>
        </div>

        {/* Right Column - System Status & Widgets */}
        <div className="space-y-6">
          {/* Status Panel */}
          <Card className="bg-black/40 border-green-500/30 p-4">
            <h3 className="text-sm font-bold text-green-400 border-b border-green-500/30 pb-2 mb-4">SYSTEM DIAGNOSTICS</h3>
            <div className="space-y-4">
              {[
                { label: "CPU LOAD", val: "12%", color: "bg-green-500" },
                { label: "MEMORY", val: "4.2GB", color: "bg-green-500" },
                { label: "NETWORK", val: "1.2Gbps", color: "bg-emerald-400" },
                { label: "THREAT LEVEL", val: "LOW", color: "bg-blue-500" },
              ].map((stat, i) => (
                <div key={i} className="flex items-center justify-between text-xs">
                  <span className="text-green-600">{stat.label}</span>
                  <div className="flex items-center gap-2">
                    <div className={`w-16 h-1 bg-green-900/50 rounded-full overflow-hidden`}>
                      <div className={`h-full ${stat.color} w-[70%] animate-pulse`} />
                    </div>
                    <span className="text-green-400 font-mono w-12 text-right">{stat.val}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>

          {/* Active Alerts */}
          <Card className="bg-black/40 border-green-500/30 p-4">
            <h3 className="text-sm font-bold text-green-400 border-b border-green-500/30 pb-2 mb-4">ACTIVE ALERTS</h3>
            <div className="space-y-2">
              {[
                "INCOMING TRANSMISSION DETECTED",
                "FIREWALL INTEGRITY: 98%",
                "NEW PERSONNEL FILES AVAILABLE"
              ].map((alert, i) => (
                <div key={i} className="flex items-start gap-2 text-xs text-green-300/80">
                  <span className="text-yellow-500 mt-0.5">⚠</span>
                  <span>{alert}</span>
                </div>
              ))}
            </div>
          </Card>

          {/* Tactical Map */}
          <div className="space-y-2">
            <h3 className="text-sm font-bold text-green-400">LIVE TACTICAL MAP</h3>
            <div className="h-64 w-full">
              <TacticalMap />
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-green-500/30 pt-3 mt-8">
        <div className="flex justify-between items-center text-xs">
          <p className="text-green-600/60">
            STANDBY FOR ORDERS<span className="animate-pulse ml-1">_</span>
          </p>
          <p className="text-green-600/60">TERMINAL v2.4.1 // SECURE MODE ENABLED</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
