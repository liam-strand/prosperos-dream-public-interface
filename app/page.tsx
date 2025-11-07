'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import BootScreen from './components/BootScreen';
import WelcomeTab from './components/WelcomeTab';
import TerminalTab from './components/TerminalTab';
import MessagesTab from './components/MessagesTab';
import StationMapTab from './components/StationMapTab';
import VaultTab from './components/VaultTab';

export default function Home() {
  const [isBooting, setIsBooting] = useState(true);
  const [bootProgress, setBootProgress] = useState(0);
  const [bootMessage, setBootMessage] = useState('INITIALIZING SYSTEMS...');
  const [activeTab, setActiveTab] = useState(0);
  const [isGlitching, setIsGlitching] = useState(false);

  const tabs = [
    { id: 0, name: 'WELCOME' },
    { id: 1, name: 'TERMINAL' },
    { id: 2, name: 'MESSAGES' },
    { id: 3, name: 'STATION MAP' },
    { id: 4, name: 'VAULT' },
  ];

  useEffect(() => {
    // Boot sequence animation
    const bootSteps = [
      { progress: 0, message: 'INITIALIZING SYSTEMS...', delay: 0 },
      { progress: 20, message: 'LOADING CORE MODULES...', delay: 300 },
      { progress: 40, message: 'ESTABLISHING NETWORK LINK...', delay: 600 },
      { progress: 60, message: 'MOUNTING FILE SYSTEMS...', delay: 900 },
      { progress: 80, message: 'STARTING SERVICES...', delay: 1200 },
      { progress: 95, message: 'FINALIZING BOOT SEQUENCE...', delay: 1500 },
      { progress: 100, message: 'BOOT COMPLETE', delay: 1800 },
    ];

    bootSteps.forEach((step) => {
      setTimeout(() => {
        setBootProgress(step.progress);
        setBootMessage(step.message);
        if (step.progress === 100) {
          setTimeout(() => setIsBooting(false), 400);
        }
      }, step.delay);
    });
  }, []);

  useEffect(() => {
    // Global keyboard handler for tab switching
    const handleGlobalKeyDown = (e: globalThis.KeyboardEvent) => {
      if (e.ctrlKey && e.key === 'h') {
        e.preventDefault();
        setActiveTab((prev) => (prev - 1 + tabs.length) % tabs.length);
      } else if (e.ctrlKey && e.key === 'l') {
        e.preventDefault();
        setActiveTab((prev) => (prev + 1) % tabs.length);
      }
    };

    window.addEventListener('keydown', handleGlobalKeyDown);
    return () => window.removeEventListener('keydown', handleGlobalKeyDown);
  }, [tabs.length]);

  useEffect(() => {
    // Random glitch effect
    const triggerGlitch = () => {
      setIsGlitching(true);
      setTimeout(() => setIsGlitching(false), 200);
    };

    // Trigger glitch randomly every 10-30 seconds
    const scheduleNextGlitch = () => {
      const delay = Math.random() * 20000 + 10000; // 10-30 seconds
      setTimeout(() => {
        triggerGlitch();
        scheduleNextGlitch(); // Schedule the next glitch
      }, delay);
    };

    scheduleNextGlitch();
  }, []);

  // Boot screen
  if (isBooting) {
    return <BootScreen bootProgress={bootProgress} bootMessage={bootMessage} />;
  }

  return (
    <div
      className="min-h-screen bg-black text-green-500 font-mono p-2 sm:p-4 cursor-text relative overflow-hidden"
    >
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

      {/* Home Button */}
      <Link
        href="/"
        className="fixed bottom-4 right-0 z-50 bg-pink-900 bg-opacity-30 border border-pink-600 border-l-0 px-4 text-pink-400 hover:text-pink-300 hover:bg-pink-900 hover:bg-opacity-50 transition-all cursor-pointer rounded-r"
        style={{
          writingMode: 'vertical-rl',
          textOrientation: 'mixed',
          transform: 'rotate(180deg)',
          boxShadow: '0 0 10px rgba(236, 72, 153, 0.3)',
          textShadow: '0 0 5px currentColor'
        }}
      >
        <span className="font-bold text-base">Home</span>
      </Link>

      <div className="max-w-5xl mx-auto relative z-10 flex flex-col h-[calc(100vh-1rem)] sm:h-[calc(100vh-2rem)]">
        {/* TUI Border Container */}
        <div
          className={`flex-1 min-h-0 border border-pink-600 sm:border-2 rounded-sm flex flex-col overflow-hidden transition-all ${isGlitching ? 'glitch' : ''}`}
          style={{ boxShadow: '0 0 10px rgba(34, 197, 94, 0.3)' }}
        >
          {/* Tab Bar */}
          <div className="flex border-b border-pink-600 sm:border-b-2 bg-black bg-opacity-50 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-2 sm:px-4 py-1.5 sm:py-2 relative transition-colors whitespace-nowrap text-xs sm:text-base flex-shrink-0 ${activeTab === tab.id
                  ? 'bg-pink-900 bg-opacity-30 text-pink-400'
                  : 'text-pink-600 hover:text-pink-500 hover:bg-pink-950 hover:bg-opacity-20'
                  }`}
                style={{ textShadow: activeTab === tab.id ? '0 0 5px currentColor' : 'none' }}
              >
                <span className="font-bold">{tab.name}</span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-pink-400" style={{ boxShadow: '0 0 5px currentColor' }} />
                )}
              </button>
            ))}
            <div className="flex-1" />
          </div>

          {/* Terminal Content */}
          {activeTab === 0 ? (
            <WelcomeTab />
          ) : activeTab === 1 ? (
            <TerminalTab />
          ) : activeTab === 2 ? (
            <MessagesTab />
          ) : activeTab === 3 ? (
            <StationMapTab />
          ) : (
            <VaultTab />
          )}
        </div>

        {/* Helper text underneath TUI - Hidden on mobile */}
        <div className="hidden sm:block text-center mt-2 text-pink-600 text-sm" style={{ textShadow: '0 0 3px currentColor' }}>
          ctrl+h prev tab - ctrl+l next tab {activeTab > 1 && '| ctrl+j down - ctrl+k up'}
        </div>
      </div>
    </div>
  );
}
