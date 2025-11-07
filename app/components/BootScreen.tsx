interface BootScreenProps {
    bootProgress: number;
    bootMessage: string;
}

export default function BootScreen({ bootProgress, bootMessage }: BootScreenProps) {
    return (
        <div className="min-h-screen bg-black text-pink-500 font-mono relative overflow-hidden flex items-center justify-center">
            {/* Scanlines overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-50"
                style={{
                    backgroundImage: 'repeating-linear-gradient(0deg, rgba(0, 0, 0, 0.15) 0px, rgba(0, 0, 0, 0.15) 1px, transparent 1px, transparent 2px)',
                }}
            />

            {/* Vignette overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-40"
                style={{
                    background: 'radial-gradient(circle at center, transparent 0%, rgba(0, 0, 0, 0.4) 80%, rgba(0, 0, 0, 0.8) 100%)',
                }}
            />

            {/* Boot screen content */}
            <div className="relative z-10 w-full max-w-2xl px-8">
                <div className="text-center mb-8">
                    <div className="text-3xl font-bold mb-2" style={{ textShadow: '0 0 10px currentColor' }}>
                        PROSPERO&apos;S DREAM PUBLIC INTERFACE
                    </div>
                    <div className="text-sm text-cyan-400" style={{ textShadow: '0 0 5px currentColor' }}>
                        Welcome to The Dream
                    </div>
                </div>

                {/* Progress bar */}
                <div className="mb-6">
                    <div className="w-full h-8 border-2 border-pink-600 rounded-sm relative overflow-hidden" style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)' }}>
                        <div
                            className="h-full bg-pink-500 transition-all duration-300 ease-out"
                            style={{
                                width: `${bootProgress}%`,
                                boxShadow: '0 0 20px rgba(34, 197, 94, 0.8)',
                            }}
                        />
                        <div className="absolute inset-0 flex items-center justify-center text-black font-bold mix-blend-difference">
                            {bootProgress}%
                        </div>
                    </div>
                </div>

                {/* Boot message */}
                <div className="text-center text-pink-400 animate-pulse" style={{ textShadow: '0 0 5px currentColor' }}>
                    {bootMessage}
                </div>

                {/* System info */}
                <div className="mt-8 text-xs text-pink-600 space-y-1">
                    <div>BIOS Version: 3.14.159</div>
                    <div>Memory: 512MB OK</div>
                    <div>System Date: [ERR:ƒΔ7$#@!▒▒▒▒▒▒▒]</div>
                </div>
            </div>
        </div>
    );
}
