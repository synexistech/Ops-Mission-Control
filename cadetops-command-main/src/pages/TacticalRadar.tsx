import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TacticalRadar = () => {
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

  const gridMap = [
    ["  ", "  ", "  ", "△", "  ", "  ", "  "],
    ["  ", "○", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "X", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
    ["  ", "  ", "△", "  ", "  ", "  ", "  "],
    ["  ", "  ", "  ", "  ", "○", "  ", "  "],
    ["  ", "  ", "  ", "  ", "  ", "  ", "  "],
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-foreground p-6 flex flex-col font-mono text-sm">
      <div className="border-b border-terminal-border pb-2 mb-4">
        <div className="flex justify-between items-start text-xs">
          <div className="space-y-1">
            <p className="text-foreground">CLASSIFICATION: SECRET // NOFORN</p>
            <p className="text-muted-foreground">SESSION ID: CDS-RADAR-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      <header className="border-b border-terminal-border pb-3 mb-4">
        <h1 className="text-xl tracking-wider mb-2">CADETOPS // TACTICAL RADAR SYSTEM</h1>
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">ACCESS LEVEL: RECRUIT</p>
          <p className="text-muted-foreground">CURRENT NODE: /ROOT/TACTICAL_RADAR</p>
        </div>
      </header>

      <main className="flex-1 grid grid-cols-2 gap-4">
        {/* Left Column - Radar Display */}
        <div className="border border-terminal-border p-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-muted-foreground">SIMULATED RADAR FEED</p>
          </div>

          <div className="space-y-4">
            <div className="border border-terminal-border p-4 font-mono text-xs leading-tight">
              <pre className="text-foreground">
                {`┌─────────────────────────────────┐
│                                 │
│         .           .           │
│                                 │
│    .                     .      │
│              X                  │
│                        .        │
│   .                             │
│                  .              │
│                                 │
└─────────────────────────────────┘`}
              </pre>
            </div>

            <div className="space-y-1 text-xs">
              <p className="text-muted-foreground">STATUS: PASSIVE SCAN MODE</p>
              <p className="text-muted-foreground">SIMULATED FEED ONLY</p>
              <p className="text-muted-foreground">NO LIVE DATA</p>
            </div>

            <div className="border-t border-terminal-border pt-3 space-y-1 text-xs">
              <p className="text-foreground">LEGEND:</p>
              <p className="text-muted-foreground">. = UNKNOWN PING</p>
              <p className="text-muted-foreground">X = ANOMALY MARKER</p>
            </div>
          </div>
        </div>

        {/* Right Column - Grid Map and Intel */}
        <div className="space-y-4">
          {/* Grid Map */}
          <div className="border border-terminal-border p-4">
            <div className="border-b border-terminal-border pb-2 mb-4">
              <p className="text-xs text-muted-foreground">GRID MODE // TRAINING ONLY</p>
            </div>

            <div className="space-y-2">
              <div className="font-mono text-xs">
                <div className="flex mb-1">
                  <span className="w-8"></span>
                  {["A", "B", "C", "D", "E", "F", "G"].map((col) => (
                    <span key={col} className="w-8 text-center text-muted-foreground">{col}</span>
                  ))}
                </div>
                {gridMap.map((row, i) => (
                  <div key={i} className="flex">
                    <span className="w-8 text-muted-foreground">{i + 1}</span>
                    {row.map((cell, j) => (
                      <span key={j} className="w-8 text-center border border-terminal-border text-foreground">
                        {cell}
                      </span>
                    ))}
                  </div>
                ))}
              </div>

              <div className="border-t border-terminal-border pt-3 space-y-1 text-xs">
                <p className="text-foreground">GRID LEGEND:</p>
                <p className="text-muted-foreground">△ = OBSERVATION POST</p>
                <p className="text-muted-foreground">○ = COMMS RELAY</p>
                <p className="text-muted-foreground">X = ANOMALY MARKER</p>
              </div>
            </div>
          </div>

          {/* Intel Panel */}
          <div className="border border-terminal-border p-4">
            <div className="border-b border-terminal-border pb-2 mb-4">
              <p className="text-xs text-muted-foreground">INTELLIGENCE FEED</p>
            </div>

            <div className="space-y-2 text-xs">
              <p className="text-foreground">&gt;&gt; DATA SOURCE: TRAINING INPUT</p>
              <p className="text-foreground">&gt;&gt; THREAT LEVEL: ALPHA</p>
              <p className="text-foreground">&gt;&gt; LAST BREACH: NONE REPORTED</p>
              <p className="text-muted-foreground mt-3">&gt;&gt; SCAN MODE: PASSIVE</p>
              <p className="text-muted-foreground">&gt;&gt; ENCRYPTION: ACTIVE</p>
              <p className="text-muted-foreground">&gt;&gt; NETWORK STATUS: SECURE</p>
            </div>
          </div>
        </div>
      </main>

      <div className="border-t border-terminal-border pt-3 mt-4">
        <p className="text-xs text-muted-foreground mb-2">&gt;&gt; AWAITING NEXT INPUT</p>
        <Button
          onClick={() => navigate("/")}
          variant="ghost"
          className="text-foreground hover:bg-secondary hover:text-foreground border-none text-xs"
        >
          [ RETURN TO MISSION CONTROL ]
        </Button>
      </div>

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

export default TacticalRadar;
