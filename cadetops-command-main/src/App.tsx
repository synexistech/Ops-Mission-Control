import { useState, useEffect } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import PersonnelFile from "./pages/PersonnelFile";
import TrainingModules from "./pages/TrainingModules";
import MissionBriefing from "./pages/MissionBriefing";
import TacticalRadar from "./pages/TacticalRadar";
import SurveillanceHub from "./pages/SurveillanceHub";
import TargetDossier from "./pages/TargetDossier";
import DecryptionGame from "./pages/DecryptionGame";
import NotFound from "./pages/NotFound";
import { BootSequence } from "./components/layout/BootSequence";
import { CyberBackground } from "./components/visuals/CyberBackground";

const queryClient = new QueryClient();

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen bg-black text-green-500 p-6 flex items-center justify-center font-mono">
        <div className="text-center border border-red-500 p-8 rounded-lg bg-red-950/20">
          <h1 className="text-2xl text-red-500 mb-4 animate-pulse">SYSTEM CRITICAL ERROR</h1>
          <p className="text-red-400/80 mb-6">KERNEL PANIC DETECTED. REBOOT REQUIRED.</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-2 bg-red-900/50 text-red-200 border border-red-500 rounded hover:bg-red-800/50 transition-colors"
          >
            INITIATE REBOOT
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => {
  const [bootComplete, setBootComplete] = useState(false);

  return (
    <ErrorBoundary>
      <QueryClientProvider client={queryClient}>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          {!bootComplete ? (
            <BootSequence onComplete={() => setBootComplete(true)} />
          ) : (
            <>
              <CyberBackground />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/personnel-file" element={<PersonnelFile />} />
                  <Route path="/training-modules" element={<TrainingModules />} />
                  <Route path="/mission-briefing" element={<MissionBriefing />} />
                  <Route path="/tactical-radar" element={<TacticalRadar />} />
                  <Route path="/surveillance" element={<SurveillanceHub />} />
                  <Route path="/targets" element={<TargetDossier />} />
                  <Route path="/decryption" element={<DecryptionGame />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </>
          )}
        </TooltipProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  );
};

export default App;
