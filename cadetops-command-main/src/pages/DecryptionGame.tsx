import React, { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { motion } from "framer-motion";

const HEX_CHARS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'A', 'B', 'C', 'D', 'E', 'F'];

const generateGrid = (size: number) => {
    const grid = [];
    for (let i = 0; i < size * size; i++) {
        grid.push(HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)] + HEX_CHARS[Math.floor(Math.random() * HEX_CHARS.length)]);
    }
    return grid;
};

const DecryptionGame = () => {
    const navigate = useNavigate();
    const [grid, setGrid] = useState<string[]>([]);
    const [targetSequence, setTargetSequence] = useState<string[]>([]);
    const [userSequence, setUserSequence] = useState<string[]>([]);
    const [timeLeft, setTimeLeft] = useState(60);
    const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
    const [score, setScore] = useState(0);

    useEffect(() => {
        startNewLevel();
    }, []);

    useEffect(() => {
        if (gameState === 'playing' && timeLeft > 0) {
            const timer = setInterval(() => setTimeLeft(prev => prev - 1), 1000);
            return () => clearInterval(timer);
        } else if (timeLeft === 0 && gameState === 'playing') {
            setGameState('lost');
        }
    }, [timeLeft, gameState]);

    const startNewLevel = () => {
        const newGrid = generateGrid(6); // 6x6 grid
        setGrid(newGrid);

        // Generate a random target sequence from the grid
        const sequenceLength = 4;
        const sequence = [];
        for (let i = 0; i < sequenceLength; i++) {
            sequence.push(newGrid[Math.floor(Math.random() * newGrid.length)]);
        }
        setTargetSequence(sequence);
        setUserSequence([]);
        setGameState('playing');
    };

    const handleCellClick = (value: string) => {
        if (gameState !== 'playing') return;

        const newSequence = [...userSequence, value];
        setUserSequence(newSequence);

        // Check if match
        if (newSequence[newSequence.length - 1] !== targetSequence[newSequence.length - 1]) {
            // Wrong input
            setUserSequence([]);
            // Penalty?
            setTimeLeft(prev => Math.max(0, prev - 5));
        } else {
            // Correct so far
            if (newSequence.length === targetSequence.length) {
                // Level Complete
                setScore(prev => prev + 100 + (timeLeft * 2));
                setTimeout(() => {
                    startNewLevel();
                }, 500);
            }
        }
    };

    return (
        <div className="min-h-screen bg-black text-green-500 p-6 font-mono flex flex-col items-center justify-center relative z-10">
            <div className="w-full max-w-4xl">
                <div className="flex justify-between items-center mb-8 border-b border-green-900/50 pb-4">
                    <div>
                        <h1 className="text-2xl font-bold tracking-widest text-green-400">DECRYPTION PROTOCOL</h1>
                        <p className="text-xs text-green-600">SECURE DATA EXTRACTION</p>
                    </div>
                    <div className="flex gap-4 items-center">
                        <div className="text-right">
                            <p className="text-xs text-green-600">TIME REMAINING</p>
                            <p className={`text-2xl font-bold ${timeLeft < 10 ? 'text-red-500 animate-pulse' : 'text-green-400'}`}>
                                {timeLeft.toString().padStart(2, '0')}s
                            </p>
                        </div>
                        <div className="text-right">
                            <p className="text-xs text-green-600">SCORE</p>
                            <p className="text-2xl font-bold text-green-400">{score}</p>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Game Grid */}
                    <Card className="bg-black/40 border-green-500/30 p-6 flex items-center justify-center">
                        {gameState === 'playing' ? (
                            <div className="grid grid-cols-6 gap-2">
                                {grid.map((cell, index) => (
                                    <motion.button
                                        key={index}
                                        whileHover={{ scale: 1.1, backgroundColor: 'rgba(0, 255, 0, 0.2)' }}
                                        whileTap={{ scale: 0.9 }}
                                        className="w-10 h-10 flex items-center justify-center text-sm font-bold border border-green-900/50 text-green-500 hover:border-green-400 transition-colors"
                                        onClick={() => handleCellClick(cell)}
                                    >
                                        {cell}
                                    </motion.button>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center space-y-4">
                                <h2 className={`text-4xl font-bold ${gameState === 'won' ? 'text-green-400' : 'text-red-500'}`}>
                                    {gameState === 'won' ? 'ACCESS GRANTED' : 'SYSTEM LOCKED'}
                                </h2>
                                <p className="text-green-600">FINAL SCORE: {score}</p>
                                <Button
                                    onClick={() => {
                                        setScore(0);
                                        setTimeLeft(60);
                                        startNewLevel();
                                    }}
                                    className="bg-green-900/20 text-green-400 border border-green-500 hover:bg-green-900/40"
                                >
                                    RETRY DECRYPTION
                                </Button>
                            </div>
                        )}
                    </Card>

                    {/* Instructions & Status */}
                    <div className="space-y-6">
                        <Card className="bg-black/40 border-green-500/30 p-6">
                            <h3 className="text-sm font-bold text-green-400 mb-4">TARGET SEQUENCE</h3>
                            <div className="flex gap-2 mb-6">
                                {targetSequence.map((code, index) => (
                                    <div
                                        key={index}
                                        className={`w-12 h-12 flex items-center justify-center border-2 font-bold text-lg
                        ${index < userSequence.length
                                                ? 'border-green-400 bg-green-900/30 text-green-400'
                                                : 'border-green-900/30 text-green-700'}`}
                                    >
                                        {code}
                                    </div>
                                ))}
                            </div>
                            <p className="text-xs text-green-600 mb-2">INSTRUCTIONS:</p>
                            <ul className="text-xs text-green-500/80 space-y-1 list-disc list-inside">
                                <li>Locate and click the hex codes in the grid matching the target sequence.</li>
                                <li>Complete the sequence before time runs out.</li>
                                <li>Incorrect inputs reduce remaining time.</li>
                            </ul>
                        </Card>

                        <Button
                            variant="outline"
                            className="w-full border-red-900/50 text-red-500 hover:bg-red-900/10 hover:text-red-400"
                            onClick={() => navigate('/')}
                        >
                            ABORT MISSION
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DecryptionGame;
