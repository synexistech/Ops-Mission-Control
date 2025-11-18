import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const TrainingModules = () => {
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

  const modules = [
    { id: "TRN-001", name: "NETWORK RECONNAISSANCE BASICS", status: "COMPLETED", difficulty: "ENTRY" },
    { id: "TRN-002", name: "THREAT VECTOR ANALYSIS", status: "COMPLETED", difficulty: "ENTRY" },
    { id: "TRN-003", name: "DEFENSIVE COUNTERMEASURES", status: "IN PROGRESS", difficulty: "INTERMEDIATE" },
    { id: "TRN-004", name: "ENCRYPTED COMMUNICATIONS", status: "LOCKED", difficulty: "INTERMEDIATE" },
    { id: "TRN-005", name: "ADVANCED PENETRATION TESTING", status: "LOCKED", difficulty: "ADVANCED" },
  ];

  return (
    <div className="min-h-screen bg-terminal-bg text-foreground p-6 flex flex-col font-mono text-sm">
      <div className="border-b border-terminal-border pb-2 mb-4">
        <div className="flex justify-between items-start text-xs">
          <div className="space-y-1">
            <p className="text-foreground">CLASSIFICATION: SECRET // NOFORN</p>
            <p className="text-muted-foreground">SESSION ID: CDS-TRAINING-{new Date().getFullYear()}</p>
          </div>
          <div className="text-right text-muted-foreground">
            <p>TIMESTAMP: {timestamp}</p>
          </div>
        </div>
      </div>

      <header className="border-b border-terminal-border pb-3 mb-4">
        <h1 className="text-xl tracking-wider mb-2">CADETOPS // TRAINING MODULES</h1>
        <div className="flex justify-between items-center text-xs">
          <p className="text-muted-foreground">ACCESS LEVEL: RECRUIT</p>
          <p className="text-muted-foreground">CURRENT NODE: /ROOT/TRAINING_MODULES</p>
        </div>
      </header>

      <main className="flex-1">
        <div className="border border-terminal-border p-4 mb-4">
          <div className="border-b border-terminal-border pb-2 mb-4">
            <p className="text-xs text-muted-foreground">AVAILABLE TRAINING PROGRAMS</p>
          </div>
          
          <div className="space-y-3">
            {modules.map((module) => (
              <div key={module.id} className="border border-terminal-border p-3 space-y-2 text-xs">
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <p className="text-foreground">{module.id} // {module.name}</p>
                    <p className="text-muted-foreground">DIFFICULTY: {module.difficulty}</p>
                  </div>
                  <p className={module.status === "COMPLETED" ? "text-foreground" : "text-muted-foreground"}>
                    {module.status}
                  </p>
                </div>
                {module.status !== "LOCKED" && (
                  <Button 
                    variant="ghost" 
                    className="text-foreground hover:bg-secondary hover:text-foreground border-none text-xs h-auto py-1"
                  >
                    [ ACCESS MODULE ]
                  </Button>
                )}
              </div>
            ))}
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

export default TrainingModules;
