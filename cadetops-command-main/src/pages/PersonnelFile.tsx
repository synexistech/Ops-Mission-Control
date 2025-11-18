import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const PersonnelFile = () => {
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

  return (
    <div className="min-h-screen bg-terminal-bg text-foreground p-6 flex flex-col font-mono text-sm">
      <div className="border-b border-terminal-border pb-2 mb-4">
        <div className="flex justify-between items-start text-xs">
          <div className="space-y-1">
            <p className="text-foreground">CLASSIFICATION: SECRET // NOFORN</p>
            <p className="text-muted-foreground">SESSION ID: CDS-PERSONNEL-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      <header className="border-b border-terminal-border pb-3 mb-4">
        <h1 className="text-xl tracking-wider mb-2">CADETOPS // PERSONNEL FILE</h1>
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">ACCESS LEVEL: RECRUIT</p>
          <p className="text-muted-foreground">CURRENT NODE: /ROOT/PERSONNEL_FILE</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="border border-terminal-border p-4 mb-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-muted-foreground">CADET IDENTIFICATION RECORD</p>
          </div>
          
          <div className="space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-muted-foreground mb-1">CADET ID</p>
                <p className="text-foreground">CDT-{Math.random().toString(36).substring(2, 9).toUpperCase()}</p>
              </div>
              <div>
                <p className="text-muted-foreground mb-1">RANK</p>
                <p className="text-foreground">RECRUIT</p>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">CLEARANCE LEVEL</p>
              <p className="text-foreground">SECRET // AUTHORIZED FOR TRAINING OPERATIONS</p>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">SPECIALIZATION</p>
              <p className="text-foreground">CYBER OPERATIONS // DEFENSIVE TACTICS</p>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">TRAINING HISTORY</p>
              <div className="space-y-1 text-foreground">
                <p>&gt; BASIC CYBER WARFARE - COMPLETED</p>
                <p>&gt; NETWORK DEFENSE FUNDAMENTALS - IN PROGRESS</p>
                <p>&gt; THREAT ASSESSMENT PROTOCOLS - PENDING</p>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">PERFORMANCE METRICS</p>
              <div className="space-y-1 text-foreground">
                <p>MISSIONS COMPLETED: 03</p>
                <p>SUCCESS RATE: 87%</p>
                <p>SKILL RATING: PROFICIENT</p>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-terminal-border pt-3">
          <p className="text-xs text-muted-foreground mb-2">&gt;&gt; COMMAND ACCEPTED</p>
          <Button 
            onClick={() => navigate("/")}
            variant="ghost" 
            className="text-foreground hover:bg-secondary hover:text-foreground border-none text-xs"
          >
            [ RETURN TO MISSION CONTROL ]
          </Button>
        </div>
      </main>

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

export default PersonnelFile;
