import { Button } from "@/components/ui/button";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
    { name: "PERSONNEL FILE", route: "/personnel-file" },
    { name: "TRAINING MODULES", route: "/training-modules" },
    { name: "MISSION BRIEFING", route: "/mission-briefing" },
    { name: "SKILL HEATMAP", route: "/tactical-radar" },
    { name: "AFTER-ACTION LOG", route: "/" },
    { name: "EXIT SYSTEM", route: "/" }
  ];

  const systemStatus = [
    { label: "SYSTEM HEALTH", value: "OPERATIONAL", status: "ok" },
    { label: "NETWORK LINK", value: "ENCRYPTED", status: "ok" },
    { label: "LAST BREACH", value: "NONE DETECTED", status: "ok" },
    { label: "SESSION START", value: "20:19:45 UTC", status: "info" }
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-foreground p-6 flex flex-col font-mono text-sm">
      {/* Top Classification Bar */}
      <div className="border-b border-terminal-border pb-2 mb-4">
        <div className="flex justify-between items-start text-xs">
          <div className="space-y-1">
            <p className="text-foreground">CLASSIFICATION: SECRET // NOFORN</p>
            <p className="text-muted-foreground">SESSION ID: CDS-{Math.random().toString(36).substring(2, 9).toUpperCase()}-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="border-b border-terminal-border pb-3 mb-4">
        <h1 className="text-xl tracking-wider mb-2">CADETOPS // MISSION CONTROL</h1>
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">ACCESS LEVEL: RECRUIT</p>
          <p className="text-muted-foreground">CURRENT NODE: /ROOT/MISSION_CONTROL</p>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 grid grid-cols-3 gap-4">
        {/* Left Column - Main Menu */}
        <div className="col-span-2 border border-terminal-border p-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-muted-foreground">PRIMARY OPERATIONS MENU</p>
          </div>
          
          <nav className="space-y-2">
            {menuItems.map((item, index) => (
              <div key={index} className="flex items-center group">
                <span className="text-muted-foreground mr-3 text-xs">OP-{String(index + 1).padStart(2, '0')}</span>
                <div className="border-l border-terminal-border h-4 mr-3"></div>
                <Button 
                  onClick={() => navigate(item.route)}
                  variant="ghost" 
                  className="text-foreground hover:bg-secondary hover:text-foreground border-none justify-start tracking-wider font-normal h-auto py-1 px-2 text-sm"
                >
                  {item.name}
                </Button>
              </div>
            ))}
          </nav>

          <div className="border-t border-terminal-border mt-6 pt-4 space-y-1 text-xs">
            <p className="text-muted-foreground">&gt;&gt; COMMAND ACCEPTED</p>
            <p className="text-muted-foreground">&gt;&gt; AWAITING NEXT INPUT</p>
          </div>
        </div>

        {/* Right Column - System Status */}
        <div className="border border-terminal-border p-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-muted-foreground">SYSTEM STATUS</p>
          </div>
          
          <div className="space-y-3 text-xs">
            {systemStatus.map((item, index) => (
              <div key={index} className="space-y-1">
                <p className="text-muted-foreground">{item.label}</p>
                <p className={item.status === "ok" ? "text-foreground" : "text-muted-foreground"}>
                  {item.value}
                </p>
                {index < systemStatus.length - 1 && (
                  <div className="border-b border-terminal-border mt-2"></div>
                )}
              </div>
            ))}
          </div>

          <div className="border-t border-terminal-border mt-6 pt-4">
            <p className="text-xs text-muted-foreground mb-2">OPERATIONS LOG</p>
            <div className="space-y-1 text-xs">
              <p className="text-muted-foreground">&gt; USER AUTH SUCCESS</p>
              <p className="text-muted-foreground">&gt; TERMINAL INIT OK</p>
              <p className="text-muted-foreground">&gt; ENCRYPTION ACTIVE</p>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-terminal-border pt-3 mt-4">
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">
            STANDBY FOR ORDERS<span className="cursor-blink ml-1">█</span>
          </p>
          <p className="text-muted-foreground">TERMINAL v2.4.1 // SECURE MODE ENABLED</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
