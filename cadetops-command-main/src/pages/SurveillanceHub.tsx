import React, { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const CCTVFeed = ({ id, label, src, status }: { id: string, label: string, src: string, status: 'online' | 'offline' | 'error' }) => {
    return (
        <div className="relative aspect-video bg-black border border-green-900/50 overflow-hidden group">
            {/* Video Feed Placeholder */}
            {status === 'online' && (
                <>
                    <img
                        src={src}
                        alt={label}
                        className="w-full h-full object-cover opacity-60 grayscale contrast-125 brightness-75 group-hover:opacity-80 transition-opacity duration-500"
                    />
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] z-10 bg-[size:100%_2px,3px_100%] pointer-events-none" />
                    <div className="absolute inset-0 animate-pulse bg-green-500/5 pointer-events-none" />
                </>
            )}

            {status === 'offline' && (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900">
                    <span className="text-red-500 font-mono blink">SIGNAL LOST</span>
                </div>
            )}

            {status === 'error' && (
                <div className="w-full h-full flex items-center justify-center bg-neutral-900 bg-[url('https://media.giphy.com/media/oEI9uBYSzLpBK/giphy.gif')] bg-cover opacity-50">
                    <span className="text-yellow-500 font-mono bg-black/50 px-2">CONNECTION UNSTABLE</span>
                </div>
            )}

            {/* Overlay UI */}
            <div className="absolute top-2 left-2 z-20 flex flex-col">
                <span className="text-[10px] text-green-500 font-mono bg-black/50 px-1">CAM-{id}</span>
                <span className="text-[10px] text-green-400 font-mono bg-black/50 px-1">{label}</span>
            </div>

            <div className="absolute top-2 right-2 z-20">
                <div className={`w-2 h-2 rounded-full ${status === 'online' ? 'bg-red-500 animate-pulse' : 'bg-gray-500'}`} />
            </div>

            <div className="absolute bottom-2 left-2 z-20 text-[10px] text-green-500/80 font-mono">
                REC [00:00:{Math.floor(Math.random() * 60).toString().padStart(2, '0')}]
            </div>
        </div>
    );
};

const SurveillanceHub = () => {
    const navigate = useNavigate();
    const [currentTime, setCurrentTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => setCurrentTime(new Date()), 1000);
        return () => clearInterval(timer);
    }, []);

    const feeds = [
        { id: "01", label: "MAIN_ENTRANCE", src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&q=80", status: 'online' as const },
        { id: "02", label: "SERVER_ROOM_A", src: "https://images.unsplash.com/photo-1558494949-ef526b004297?w=500&q=80", status: 'online' as const },
        { id: "03", label: "PARKING_B2", src: "https://images.unsplash.com/photo-1470224114660-3f6686c562eb?w=500&q=80", status: 'online' as const },
        { id: "04", label: "ROOFTOP_ACCESS", src: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=500&q=80", status: 'error' as const },
        { id: "05", label: "CORRIDOR_EAST", src: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=500&q=80", status: 'online' as const },
        { id: "06", label: "RESTRICTED_AREA", src: "", status: 'offline' as const },
    ];

    return (
        <div className="min-h-screen bg-black text-green-500 p-6 font-mono relative z-10">
            <div className="flex justify-between items-center mb-6 border-b border-green-900/50 pb-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-widest text-green-400">SURVEILLANCE HUB</h1>
                    <p className="text-xs text-green-600">GLOBAL MONITORING NETWORK // ACTIVE</p>
                </div>
                <div className="text-right">
                    <p className="text-xl font-bold">{currentTime.toLocaleTimeString()}</p>
                    <Button
                        variant="outline"
                        className="h-8 text-xs border-green-500 text-green-500 hover:bg-green-900/20"
                        onClick={() => navigate('/')}
                    >
                        RETURN TO COMMAND
                    </Button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {feeds.map((feed, index) => (
                    <motion.div
                        key={feed.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                    >
                        <CCTVFeed {...feed} />
                    </motion.div>
                ))}
            </div>

            <div className="mt-6 grid grid-cols-4 gap-4">
                <Card className="bg-black/40 border-green-900/50 p-4 col-span-4 lg:col-span-1">
                    <h3 className="text-sm font-bold mb-2 text-green-400">NETWORK LOGS</h3>
                    <div className="text-xs space-y-1 text-green-600/80 h-32 overflow-hidden">
                        <p>&gt; CAM-01 MOTION DETECTED</p>
                        <p>&gt; CAM-04 SIGNAL DEGRADATION</p>
                        <p>&gt; CAM-02 RECORDING ARCHIVED</p>
                        <p>&gt; SYSTEM SCAN COMPLETE</p>
                        <p>&gt; BANDWIDTH USAGE: 45%</p>
                    </div>
                </Card>
                <div className="col-span-4 lg:col-span-3 border border-green-900/50 bg-black/40 p-4 flex items-center justify-center">
                    <div className="text-center">
                        <p className="text-sm text-green-500 mb-2">AI RECOGNITION SYSTEM</p>
                        <div className="flex gap-4">
                            <div className="w-24 h-24 border border-green-500/30 rounded flex items-center justify-center">
                                <span className="text-xs text-green-700">NO FACE</span>
                            </div>
                            <div className="w-24 h-24 border border-green-500/30 rounded flex items-center justify-center">
                                <span className="text-xs text-green-700">NO PLATE</span>
                            </div>
                            <div className="w-24 h-24 border border-green-500/30 rounded flex items-center justify-center">
                                <span className="text-xs text-green-700">NO THREAT</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SurveillanceHub;
