import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const MissionBriefing = () => {
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
            <p className="text-muted-foreground">SESSION ID: CDS-MISSION-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      <header className="border-b border-terminal-border pb-3 mb-4">
        <h1 className="text-xl tracking-wider mb-2">CADETOPS // MISSION BRIEFING</h1>
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">ACCESS LEVEL: RECRUIT</p>
          <p className="text-muted-foreground">CURRENT NODE: /ROOT/MISSION_BRIEFING</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="border border-terminal-border p-4 mb-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-foreground">MISSION ID: TRN-ALPHA-047</p>
          </div>
          
          <div className="space-y-4 text-xs">
            <div>
              <p className="text-muted-foreground mb-2">OBJECTIVE</p>
              <p className="text-foreground">CONDUCT NETWORK PENETRATION ASSESSMENT ON SIMULATED ADVERSARY INFRASTRUCTURE. IDENTIFY VULNERABILITIES AND DOCUMENT SECURITY GAPS WITHOUT TRIGGERING DETECTION SYSTEMS.</p>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">THREAT ASSESSMENT</p>
              <div className="space-y-1 text-foreground">
                <p>&gt; ADVERSARY CAPABILITY: MODERATE</p>
                <p>&gt; DETECTION RISK: LOW TO MEDIUM</p>
                <p>&gt; COUNTERMEASURE LEVEL: STANDARD</p>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">MISSION PARAMETERS</p>
              <div className="space-y-1 text-foreground">
                <p>TIME LIMIT: 45 MINUTES</p>
                <p>AUTHORIZED TOOLS: RECONNAISSANCE SUITE ALPHA</p>
                <p>RULES OF ENGAGEMENT: OBSERVE ONLY // NO ACTIVE EXPLOITATION</p>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">SUCCESS CRITERIA</p>
              <div className="space-y-1 text-foreground">
                <p>[ ] IDENTIFY MINIMUM 3 NETWORK ENTRY POINTS</p>
                <p>[ ] MAP INTERNAL NETWORK TOPOLOGY</p>
                <p>[ ] DOCUMENT SECURITY WEAKNESSES</p>
                <p>[ ] MAINTAIN OPERATIONAL SECURITY</p>
              </div>
            </div>

            <div className="border-t border-terminal-border pt-4">
              <p className="text-muted-foreground mb-2">MISSION STATUS</p>
              <p className="text-foreground">AWAITING CADET AUTHORIZATION TO BEGIN</p>
            </div>
          </div>
        </div>

        <div className="border border-terminal-border p-4 mb-4">
          <p className="text-xs text-muted-foreground mb-2">&gt;&gt; COMMAND ACCEPTED</p>
          <div className="space-y-2">
            <Button 
              variant="ghost" 
              className="text-foreground hover:bg-secondary hover:text-foreground border-none text-xs"
            >
              [ BEGIN MISSION ]
            </Button>
            <br />
            <Button 
              onClick={() => navigate("/")}
              variant="ghost" 
              className="text-foreground hover:bg-secondary hover:text-foreground border-none text-xs"
            >
              [ RETURN TO MISSION CONTROL ]
            </Button>
          </div>
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

export default MissionBriefing;
