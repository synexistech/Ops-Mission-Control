import { useState } from "react";
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
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const ErrorBoundary = ({ children }: { children: React.ReactNode }) => {
  const [hasError, setHasError] = useState(false);

  if (hasError) {
    return (
      <div className="min-h-screen bg-terminal-bg text-foreground p-6 flex items-center justify-center font-mono">
        <div className="text-center">
          <h1 className="text-xl text-destructive mb-4">SYSTEM ERROR</h1>
          <p className="text-muted-foreground mb-4">An unexpected error has occurred.</p>
          <button
            onClick={() => setHasError(false)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded hover:bg-primary/90"
          >
            RETRY
          </button>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};

const App = () => (
  <ErrorBoundary>
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/personnel-file" element={<PersonnelFile />} />
            <Route path="/training-modules" element={<TrainingModules />} />
            <Route path="/mission-briefing" element={<MissionBriefing />} />
            <Route path="/tactical-radar" element={<TacticalRadar />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </ErrorBoundary>
);

export default App;
