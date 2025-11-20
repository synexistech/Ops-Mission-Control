import React, { useState } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface Target {
    id: string;
    name: string;
    alias: string;
    status: 'active' | 'captured' | 'eliminated' | 'unknown';
    threatLevel: 'low' | 'medium' | 'high' | 'critical';
    lastSeen: string;
    description: string;
    image: string;
}

const targets: Target[] = [
    {
        id: "T-8892",
        name: "ALEXANDER VORONOV",
        alias: "THE ARCHITECT",
        status: 'active',
        threatLevel: 'critical',
        lastSeen: "KUALA LUMPUR, MY",
        description: "Former intelligence officer turned cyber-mercenary. Specializes in infrastructure sabotage. Highly dangerous. Do not approach without backup.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80"
    },
    {
        id: "T-1024",
        name: "SARAH CHEN",
        alias: "GHOST PROTOCOL",
        status: 'unknown',
        threatLevel: 'high',
        lastSeen: "SINGAPORE",
        description: "Master of social engineering and infiltration. Suspected leader of the 'Neon Syndicate'.",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80"
    },
    {
        id: "T-3341",
        name: "MARCUS REED",
        alias: "IRONCLAD",
        status: 'captured',
        threatLevel: 'medium',
        lastSeen: "DETENTION BLOCK A",
        description: "Arms dealer supplying cybernetic enhancements to insurgent groups. Currently awaiting interrogation.",
        image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80"
    }
];

const TargetDossier = () => {
    const navigate = useNavigate();
    const [selectedTarget, setSelectedTarget] = useState<Target>(targets[0]);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'active': return 'text-red-500 border-red-500';
            case 'captured': return 'text-yellow-500 border-yellow-500';
            case 'eliminated': return 'text-gray-500 border-gray-500';
            default: return 'text-blue-500 border-blue-500';
        }
    };

    return (
        <div className="min-h-screen bg-black text-green-500 p-6 font-mono relative z-10">
            <div className="flex justify-between items-center mb-6 border-b border-green-900/50 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-widest text-green-400">TARGET DOSSIER</h1>
                    <p className="text-xs text-green-600">HIGH VALUE TARGET DATABASE</p>
                </div>
                <Button
                    variant="outline"
                    className="h-8 text-xs border-green-500 text-green-500 hover:bg-green-900/20"
                    onClick={() => navigate('/')}
                >
                    RETURN TO COMMAND
                </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
                {/* Target List */}
                <div className="md:col-span-4 space-y-4">
                    {targets.map((target) => (
                        <Card
                            key={target.id}
                            className={`bg-black/40 border p-4 cursor-pointer transition-all hover:bg-green-900/20 ${selectedTarget.id === target.id ? 'border-green-400 bg-green-900/10' : 'border-green-900/50'}`}
                            onClick={() => setSelectedTarget(target)}
                        >
                            <div className="flex items-center justify-between">
                                <div>
                                    <p className="text-xs text-green-600 font-bold">{target.id}</p>
                                    <h3 className="text-lg font-bold text-green-400">{target.alias}</h3>
                                </div>
                                <Badge variant="outline" className={`${getStatusColor(target.status)} uppercase text-[10px]`}>
                                    {target.status}
                                </Badge>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Target Details */}
                <div className="md:col-span-8">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={selectedTarget.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <Card className="bg-black/60 border-green-500/50 p-6 relative overflow-hidden">
                                <div className="absolute top-0 right-0 p-4 opacity-20">
                                    <span className="text-9xl font-black text-green-500">TOP SECRET</span>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
                                    <div className="md:col-span-1">
                                        <div className="aspect-[3/4] w-full border-2 border-green-500/30 p-1 relative">
                                            <img
                                                src={selectedTarget.image}
                                                alt={selectedTarget.name}
                                                className="w-full h-full object-cover grayscale contrast-125"
                                            />
                                            <div className="absolute bottom-0 left-0 w-full bg-green-900/80 p-1 text-center">
                                                <span className="text-xs font-bold text-green-100">IMG_ID: {selectedTarget.id}</span>
                                            </div>
                                            {/* Crosshair overlay */}
                                            <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-red-500/50" />
                                            <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-red-500/50" />
                                            <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-red-500/50" />
                                            <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-red-500/50" />
                                        </div>
                                    </div>

                                    <div className="md:col-span-2 space-y-6">
                                        <div>
                                            <h2 className="text-3xl font-bold text-green-400 mb-1">{selectedTarget.name}</h2>
                                            <p className="text-green-600 text-sm tracking-widest">AKA: {selectedTarget.alias}</p>
                                        </div>

                                        <div className="grid grid-cols-2 gap-4 text-sm">
                                            <div>
                                                <p className="text-green-700 font-bold text-xs">THREAT LEVEL</p>
                                                <p className={`text-lg font-bold ${selectedTarget.threatLevel === 'critical' ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                                                    {selectedTarget.threatLevel.toUpperCase()}
                                                </p>
                                            </div>
                                            <div>
                                                <p className="text-green-700 font-bold text-xs">LAST SEEN</p>
                                                <p className="text-green-400">{selectedTarget.lastSeen}</p>
                                            </div>
                                        </div>

                                        <div>
                                            <p className="text-green-700 font-bold text-xs mb-2">PROFILE SUMMARY</p>
                                            <p className="text-green-400/80 leading-relaxed border-l-2 border-green-500/30 pl-4">
                                                {selectedTarget.description}
                                            </p>
                                        </div>

                                        <div className="pt-4 border-t border-green-900/30 flex gap-4">
                                            <Button className="bg-red-900/20 text-red-400 border border-red-900 hover:bg-red-900/40">
                                                MARK AS ELIMINATED
                                            </Button>
                                            <Button className="bg-green-900/20 text-green-400 border border-green-900 hover:bg-green-900/40">
                                                UPDATE INTEL
                                            </Button>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </motion.div>
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default TargetDossier;
