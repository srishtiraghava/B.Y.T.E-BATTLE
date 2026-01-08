import React,{ useState, useEffect } from 'react';
import { Moon, Sun, Menu, Swords, Zap, Trophy, AlertTriangle } from 'lucide-react';

const ByteBattleHomepage = () => {
    const [isDark, setIsDark] = useState(true);
    const [showLetters, setShowLetters] = useState([]);
    const [timeLeft, setTimeLeft] = useState(266);

    useEffect(() => {
        const letters = ['B', '.', 'Y', '.', 'T', '.', 'E', ' ', 'B', 'A', 'T', 'T', 'L', 'E'];
        letters.forEach((_letter, index) => {
            setTimeout(() => {
                setShowLetters(prev => [...prev, index]);
            }, index * 100);
        });
    }, []);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 0) return 300;
                return prev - 1;
            });
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const letters = ['B', '.', 'Y', '.', 'T', '.', 'E', ' ', 'B', 'A', 'T', 'T', 'L', 'E'];

    return (
        <div className={`min-h-dvh w-full ${isDark ? 'bg-gradient-to-b from-black via-gray-900 to-gray-800 text-white' : 'bg-white text-gray-900'} transition-colors duration-500`}>
                <>
                    <div className="fixed top-0 left-0 w-32 h-32 border-l-4 border-t-4 border-yellow-500"></div>
                    <div className="fixed top-0 right-0 w-32 h-32 border-r-4 border-t-4 border-yellow-500"></div>
                    <div className="fixed bottom-0 left-0 w-32 h-32 border-l-4 border-b-4 border-yellow-500"></div>
                    <div className="fixed bottom-0 right-0 w-32 h-32 border-r-4 border-b-4 border-yellow-500"></div>
                </>
          
            <nav className={`relative z-10 px-6 py-4 flex items-center justify-between border-b ${isDark ? 'border-gray-800' : 'border-gray-200'}`}>
                <div className="flex items-center space-x-2">
                    <div className={`w-10 h-10 ${isDark ? 'bg-gradient-to-br from-yellow-500 to-red-600' : 'bg-gradient-to-br from-blue-500 to-cyan-400'} rounded-lg flex items-center justify-center`}>
                        <Swords className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-xl font-bold ${isDark ? 'bg-gradient-to-r from-yellow-200 to-red-300 bg-clip-text text-transparent' : 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent'}`}>
                        ByteBattle
                    </span>
                </div>

                <div className="flex items-center space-x-8">
                    <a href="#" className={`transition font-medium ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-500'}`}>
                        Home
                    </a>
                    <a href="#" className={`transition font-medium ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-500'}`}>
                        Guide
                    </a>
                    <a href="#" className={`transition font-medium ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-500'}`}>
                        Level Sheet
                    </a>
                    <a href="#" className={`transition font-medium ${isDark ? 'text-white hover:text-yellow-400' : 'text-gray-900 hover:text-blue-500'}`}>
                        Contest
                    </a>
                    <button
                        onClick={() => setIsDark(!isDark)}
                        className={`p-2 rounded-lg transition ${isDark ? 'hover:bg-gray-900' : 'hover:bg-gray-200'}`}
                    >
                        {isDark ? <Sun className="w-5 h-5 text-yellow-400" /> : <Moon className="w-5 h-5" />}
                    </button>
                    <button className={`px-6 py-2 rounded-lg font-medium transition ${isDark ? 'bg-gray-800 hover:bg-gray-700 text-white' : 'bg-blue-500 hover:bg-blue-600 text-white'}`}>
                        Login
                    </button>
                    <button className="md:hidden">
                        <Menu className="w-6 h-6" />
                    </button>
                </div>
            </nav>

            <div className="relative z-10 container mx-auto px-10 py-16">
                {isDark && (
                    <div className="flex justify-center mb-8">
                        <div className="border-2 border-red-600 bg-red-900/20 px-8 py-2 rounded-lg flex items-center space-x-3">
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                            <span className="text-yellow-400 font-bold tracking-wider text-sm">SYSTEM ACTIVE</span>
                            <AlertTriangle className="w-5 h-5 text-yellow-400" />
                        </div>
                    </div>
                )}

                <div className="text-center mb-8">
                    <h1 className={`text-5xl md:text-7xl font-bold mb-4 ${isDark ? 'text-white' : ''}`}>
                        {isDark ? (
                            <>
                                <div className="mb-2">
                                    <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>KEEP </span>
                                    <span className="text-white" style={{ textShadow: '0 0 20px rgba(255,255,255,0.5)' }}>SOLVING</span>
                                </div>
                                <div className="text-red-500 text-4xl md:text-5xl" style={{ textShadow: '0 0 20px rgba(239,68,68,0.5)' }}>
                                    AND NOBODY EXPLODES
                                </div>
                            </>
                        ) : (
                            letters.map((letter, index) => (
                                <span
                                    key={index}
                                    className={`inline-block transition-all duration-500 ${showLetters.includes(index) ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-8'} ${letter === '.' ? 'text-blue-500' : 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent'}`}
                                    style={{ transitionDelay: `${index * 50}ms` }}
                                >
                                    {letter === ' ' ? '\u00A0' : letter}
                                </span>
                            ))
                        )}
                    </h1>
                    {!isDark && (
                        <p className="text-xl md:text-2xl text-gray-600">
                            Competitive Coding <span className="text-blue-500 font-semibold">Simplified</span>
                        </p>
                    )}
                </div>

                <div className="max-w-md mx-auto mb-16">
                    <p className={`text-center text-sm mb-4 tracking-widest ${isDark ? 'text-gray-400' : 'text-gray-500'}`}>
                        EVERY TICK COUNTS.
                    </p>
                    <div className={`relative p-1 rounded-2xl ${isDark ? 'bg-gradient-to-r from-cyan-500 to-cyan-400' : 'border-2 border-blue-500/20'}`}>
                        <div className={`${isDark ? 'bg-black' : 'bg-white'} rounded-xl p-8`}>
                            <div className="flex items-center justify-center">
                                <div className={`text-7xl font-mono font-bold tracking-wider ${isDark ? 'text-cyan-400' : 'bg-gradient-to-r from-blue-500 to-cyan-400 bg-clip-text text-transparent'}`}>
                                    {formatTime(timeLeft)}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="text-center mb-16">
                    <button className={`px-10 py-4 rounded-xl font-semibold text-lg transition-shadow ${isDark ? 'bg-gradient-to-r from-yellow-500 to-red-500 hover:from-yellow-600 hover:to-red-600 shadow-lg hover:shadow-xl text-white' : 'bg-gradient-to-r from-blue-500 to-cyan-400 hover:from-blue-600 hover:to-cyan-500 shadow-lg hover:shadow-xl text-white'}`}>
                        START BATTLE
                    </button>
                </div>

                {!isDark && (
                    <div className="max-w-2xl mx-auto mb-8">
                        
                    </div>
                )}

                {!isDark && (
                    <div className="text-center space-y-6">
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center space-x-2">
                                <Zap className="w-5 h-5" />
                                <span>Start Battle</span>
                            </button>
                            <button className="px-8 py-4 bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 rounded-xl font-semibold text-lg transition shadow-lg hover:shadow-xl flex items-center space-x-2">
                                <Trophy className="w-5 h-5" />
                                <span>View Rules</span>
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ByteBattleHomepage;
