import React, { useState, useRef, useEffect } from 'react';
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";

interface TerminalHistory {
    command: string;
    output: string | React.ReactNode;
    timestamp: string;
}

export const InteractiveTerminal: React.FC = () => {
    const [history, setHistory] = useState<TerminalHistory[]>([
        {
            command: 'init',
            output: 'Terminal session established. Type "help" for available commands.',
            timestamp: new Date().toLocaleTimeString()
        }
    ]);
    const [input, setInput] = useState('');
    const bottomRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
    }, [history]);

    const handleCommand = (e: React.FormEvent) => {
        e.preventDefault();
        if (!input.trim()) return;

        const cmd = input.trim().toLowerCase();
        let output: string | React.ReactNode = '';

        switch (cmd) {
            case 'help':
                output = (
                    <div className="space-y-1 text-cyan-400">
                        <p>AVAILABLE COMMANDS:</p>
                        <p>  help     - Show this help message</p>
                        <p>  status   - Display system status</p>
                        <p>  scan     - Initiate network scan</p>
                        <p>  clear    - Clear terminal history</p>
                        <p>  whoami   - Display current user identity</p>
                    </div>
                );
                break;
            case 'status':
                output = "SYSTEM OPTIMAL. ALL SECTORS SECURE. THREAT LEVEL: LOW.";
                break;
            case 'scan':
                output = "SCANNING NETWORK... NO ANOMALIES DETECTED.";
                break;
            case 'clear':
                setHistory([]);
                setInput('');
                return;
            case 'whoami':
                output = "OPERATOR: CADET ALPHA-1. CLEARANCE: LEVEL 3.";
                break;
            default:
                output = `Command not found: ${cmd}`;
        }

        setHistory(prev => [...prev, {
            command: input,
            output,
            timestamp: new Date().toLocaleTimeString()
        }]);
        setInput('');
    };

    return (
        <div className="w-full h-64 md:h-96 border border-green-500/30 bg-black/80 rounded-md overflow-hidden flex flex-col font-mono text-sm md:text-base shadow-[0_0_15px_rgba(0,255,0,0.1)]">
            <div className="bg-green-900/20 px-4 py-2 border-b border-green-500/30 flex items-center justify-between">
                <span className="text-green-500 font-bold">TERMINAL_V2.0</span>
                <div className="flex gap-2">
                    <div className="w-3 h-3 rounded-full bg-red-500/50" />
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50" />
                    <div className="w-3 h-3 rounded-full bg-green-500/50" />
                </div>
            </div>

            <ScrollArea className="flex-1 p-4">
                <div className="space-y-4">
                    {history.map((entry, i) => (
                        <div key={i} className="space-y-1">
                            <div className="flex items-center gap-2 text-green-600/70 text-xs">
                                <span>[{entry.timestamp}]</span>
                                <span>$ {entry.command}</span>
                            </div>
                            <div className="text-green-400 pl-4">
                                {entry.output}
                            </div>
                        </div>
                    ))}
                    <div ref={bottomRef} />
                </div>
            </ScrollArea>

            <form onSubmit={handleCommand} className="p-2 border-t border-green-500/30 bg-black/90 flex items-center gap-2">
                <span className="text-green-500 animate-pulse">{`>`}</span>
                <Input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    className="border-none bg-transparent text-green-400 focus-visible:ring-0 font-mono placeholder:text-green-800"
                    placeholder="Enter command..."
                    autoFocus
                />
            </form>
        </div>
    );
};
