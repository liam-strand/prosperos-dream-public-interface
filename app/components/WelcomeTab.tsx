import Image from 'next/image';

export default function WelcomeTab() {

    const stats = [
        { label: 'POPULATION (CITY/CHOKE)', value: '5.6m/3.1m', status: 'NOMINAL' },
        { label: 'OXYGEN LEVEL', value: '21.2%', status: 'NOMINAL' },
        { label: 'ARTIFICIAL GRAVITY', value: '1.0 G', status: 'STABLE' },
        { label: 'ATMOSPHERIC CONTAMINATION', value: '0.04 µSv', status: 'ACCEPTABLE' },
        { label: 'NEURAL NOISE INDEX', value: '3.8%', status: 'ELEVATED' },
        { label: 'UNACCOUNTED MASS', value: '+12,481 kg', status: 'UNDER INVESTIGATION' }
    ];

    return (
        <div className="flex flex-1 min-h-0 flex-col p-3 sm:p-6">
            <div className="flex-1 overflow-y-auto terminal-scroll">

                {/* Welcome */}
                <div className="py-2">
                    <div className="text-center text-pink-300 text-base sm:text-lg md:text-xl font-bold mb-2 px-2" style={{ textShadow: '0 0 5px currentColor' }}>
                        Welcome to
                    </div>
                </div>

                {/* ASCII Art Image*/}
                <div className="mb-3 sm:mb-4 overflow-hidden bg-black bg-opacity-50 flex items-center justify-center h-32 sm:h-48 md:h-64">
                    <Image
                        src="/ASCIIDREAM.png"
                        alt="Prosperos Dream"
                        width={800}
                        height={300}
                        className="object-contain w-full h-full"
                        style={{ filter: 'saturate(1.2)' }}
                    />
                </div>

                {/* Station Info */}
                <div className="py-2 sm:py-4">
                    <div className="text-center text-pink-300 text-xs sm:text-sm md:text-base font-bold mb-2 px-2" style={{ textShadow: '0 0 5px currentColor' }}>
                        Prospero’s Dream is the Outer Rim’s premier freeport and commercial hub, a shining example of interstellar cooperation where opportunity, innovation, and prosperity thrive under the careful stewardship of Tempest Company.
                    </div>
                </div>

                {/* Stats Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4 mb-4 sm:mb-6">
                    {stats.map((stat, index) => (
                        <div
                            key={index}
                            className="border border-pink-700 p-2 sm:p-3 bg-black bg-opacity-30 hover:bg-opacity-50 transition-all"
                        >
                            <div className="text-pink-500 text-[10px] sm:text-xs mb-1">{stat.label}</div>
                            <div className="text-pink-300 text-lg sm:text-xl md:text-2xl font-bold mb-1" style={{ textShadow: '0 0 5px currentColor' }}>
                                {stat.value}
                            </div>
                            <div className="text-green-400 text-[10px] sm:text-xs">● {stat.status}</div>
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}
