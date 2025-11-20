import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface BootSequenceProps {
    onComplete: () => void;
}

const bootLines = [
    "INITIALIZING CADETOPS KERNEL...",
    "LOADING MEMORY MODULES... OK",
    "MOUNTING VIRTUAL FILESYSTEM... OK",
    "ESTABLISHING SECURE UPLINK...",
    "VERIFYING BIOMETRIC SIGNATURES...",
    "DECRYPTING MISSION FILES...",
    "SYSTEM READY."
];

export const BootSequence: React.FC<BootSequenceProps> = ({ onComplete }) => {
    const [lines, setLines] = useState<string[]>([]);
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (currentIndex < bootLines.length) {
            const timeout = setTimeout(() => {
                setLines(prev => [...prev, bootLines[currentIndex]]);
                setCurrentIndex(prev => prev + 1);
            }, Math.random() * 500 + 200); // Random delay between lines
            return () => clearTimeout(timeout);
        } else {
            const timeout = setTimeout(() => {
                onComplete();
            }, 1000);
            return () => clearTimeout(timeout);
        }
    }, [currentIndex, onComplete]);

    return (
        <div className="fixed inset-0 bg-black text-green-500 font-mono p-8 z-50 flex flex-col justify-end pb-20">
            <div className="max-w-2xl w-full mx-auto">
                {lines.map((line, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="mb-2 text-lg md:text-xl"
                    >
                        <span className="mr-2">{`>`}</span>
                        {line}
                    </motion.div>
                ))}
                <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ repeat: Infinity, duration: 0.8 }}
                    className="w-3 h-6 bg-green-500 inline-block ml-2"
                />
            </div>
        </div>
    );
};
