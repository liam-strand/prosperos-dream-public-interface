'use client';

import { useState, useEffect, useCallback } from 'react';
import { allVaultFiles, VaultFile } from '../vault';

const VAULT_PASSWORD = 'donottellityourname';

export default function VaultTab() {
    const [isUnlocked, setIsUnlocked] = useState(false);
    const [password, setPassword] = useState('');
    const [selectedFile, setSelectedFile] = useState<VaultFile | null>(null);
    const [showFileDetail, setShowFileDetail] = useState(false);
    const [error, setError] = useState('');
    const [attempts, setAttempts] = useState(0);

    const handleUnlock = (e: React.FormEvent) => {
        e.preventDefault();

        if (password === VAULT_PASSWORD) {
            setIsUnlocked(true);
            setError('');
            setSelectedFile(allVaultFiles[0]);
        } else {
            setAttempts(prev => prev + 1);
            setError(`ACCESS DENIED - Invalid credentials (${attempts + 1} attempts)`);
            setPassword('');

            // Lock out after 3 failed attempts
            if (attempts >= 2) {
                setError('SECURITY LOCKOUT - Too many failed attempts. System locked for 30 seconds.');
                setTimeout(() => {
                    setAttempts(0);
                    setError('');
                }, 30000);
            }
        }
    };

    const handleFileSelect = useCallback((file: VaultFile) => {
        setSelectedFile(file);
        setShowFileDetail(true);
    }, []);

    // Keyboard navigation
    useEffect(() => {
        if (!isUnlocked) return;

        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.ctrlKey && e.key === 'j') {
                e.preventDefault();
                setSelectedFile(prev => {
                    if (!prev) return allVaultFiles[0];
                    const currentIndex = allVaultFiles.findIndex(f => f.id === prev.id);
                    const newIndex = Math.min(currentIndex + 1, allVaultFiles.length - 1);
                    return allVaultFiles[newIndex];
                });
            } else if (e.ctrlKey && e.key === 'k') {
                e.preventDefault();
                setSelectedFile(prev => {
                    if (!prev) return allVaultFiles[0];
                    const currentIndex = allVaultFiles.findIndex(f => f.id === prev.id);
                    const newIndex = Math.max(currentIndex - 1, 0);
                    return allVaultFiles[newIndex];
                });
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isUnlocked]);

    const getClassificationColor = (classification: string) => {
        switch (classification) {
            case 'TOP SECRET': return 'text-red-500';
            case 'CLASSIFIED': return 'text-orange-500';
            case 'CONFIDENTIAL': return 'text-yellow-500';
            case 'RESTRICTED': return 'text-pink-500';
            default: return 'text-gray-500';
        }
    };

    if (!isUnlocked) {
        return (
            <div className="h-full flex items-center justify-center p-8">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <div className="text-2xl font-bold text-pink-500 mb-2" style={{ textShadow: '0 0 10px currentColor' }}>
                            SECURE VAULT ACCESS
                        </div>
                        <div className="text-sm text-pink-400">
                            Authorization Required
                        </div>
                    </div>

                    <form onSubmit={handleUnlock} className="space-y-4">
                        <div>
                            <label className="block text-pink-500 mb-2 text-sm">
                                PASSWORD:
                            </label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                disabled={attempts >= 3}
                                className="w-full bg-black border-2 border-pink-600 text-pink-500 px-4 py-3 font-mono focus:outline-none focus:border-pink-400 focus:shadow-[0_0_10px_rgba(34,211,238,0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
                                placeholder="Enter vault password..."
                                autoFocus
                            />
                        </div>

                        {error && (
                            <div className="text-red-500 text-sm border border-red-500 p-3 animate-pulse">
                                ⚠ {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={attempts >= 3 || !password}
                            className="w-full bg-pink-600 hover:bg-pink-700 disabled:bg-gray-700 disabled:cursor-not-allowed text-black font-bold py-3 px-6 border-2 border-pink-500 hover:shadow-[0_0_20px_rgba(236,72,153,0.8)] transition-all disabled:shadow-none"
                        >
                            {attempts >= 3 ? 'LOCKED' : 'UNLOCK VAULT'}
                        </button>

                        <div className="mt-6 p-3 border border-pink-700 bg-pink-950 bg-opacity-20">
                            <div className="text-xs text-pink-500 font-mono">
                                Unauthorized access attempts will be logged. Use &apos;auth&apos; command to view recent logs
                            </div>
                        </div>

                        <div className="text-xs text-pink-600 text-center mt-4">

                        </div>
                    </form>
                </div>
            </div>
        );
    }

    return (
        <div className="h-full flex">
            {/* Desktop: File list - left side */}
            <div className={`w-full md:w-1/3 md:border-r-2 border-pink-600 overflow-y-auto ${showFileDetail ? 'hidden md:block' : 'block'}`}>
                <div className="sticky top-0 bg-black border-b-2 border-pink-600 p-2 sm:p-4">
                    <div className="text-pink-500 font-bold text-sm sm:text-base md:text-lg">
                        VAULT FILES
                    </div>
                    <div className="text-[10px] sm:text-xs text-pink-400 mt-1">
                        {allVaultFiles.length} classified document{allVaultFiles.length !== 1 ? 's' : ''}
                    </div>
                </div>

                <div>
                    {allVaultFiles.map((file) => (
                        <button
                            key={file.id}
                            onClick={() => handleFileSelect(file)}
                            className={`w-full text-left p-2 sm:p-3 md:p-4 border-b border-pink-600/30 hover:bg-pink-600/10 transition-colors ${selectedFile?.id === file.id ? 'bg-pink-600/20' : ''
                                }`}
                        >
                            <div className="flex items-start justify-between mb-1">
                                <span className="font-mono text-xs sm:text-sm text-pink-500">
                                    {file.name}
                                </span>
                            </div>
                            <div className={`text-[10px] sm:text-xs font-bold ${getClassificationColor(file.classification)}`}>
                                {file.classification}
                            </div>
                            <div className="text-[10px] sm:text-xs text-pink-400/70 mt-1">
                                {file.type.toUpperCase()}
                            </div>
                        </button>
                    ))}
                </div>
            </div>

            {/* File viewer - right side / full width on mobile */}
            <div className={`flex-1 overflow-y-auto terminal-scroll ${showFileDetail ? 'block' : 'hidden md:block'}`}>
                {selectedFile ? (
                    <div className="p-3 sm:p-4 md:p-6 pb-12">
                        {/* Back button - Only visible on mobile */}
                        <button
                            onClick={() => setShowFileDetail(false)}
                            className="md:hidden mb-3 px-3 py-1.5 border border-pink-600 text-pink-400 text-xs hover:bg-pink-950 hover:bg-opacity-20 transition-colors"
                            style={{ textShadow: '0 0 5px currentColor' }}
                        >
                            ← BACK TO FILES
                        </button>

                        <div className="mb-4 sm:mb-6 pb-3 sm:pb-4 border-b-2 border-pink-600">
                            <div className="flex items-start justify-between mb-2 flex-wrap gap-2">
                                <div>
                                    <div className="text-base sm:text-lg md:text-2xl font-mono text-pink-500 mb-2">
                                        {selectedFile.name}
                                    </div>
                                    <div className={`inline-block px-2 sm:px-3 py-1 text-[10px] sm:text-xs font-bold border sm:border-2 ${getClassificationColor(selectedFile.classification)}`}>
                                        {selectedFile.classification}
                                    </div>
                                </div>
                                <div className="text-right text-xs sm:text-sm text-pink-400">
                                    <div className="text-[10px] sm:text-xs text-pink-600 mt-1">ID: {selectedFile.id}</div>
                                </div>
                            </div>
                        </div>

                        <pre className="text-pink-500 whitespace-pre-wrap break-words overflow-hidden font-mono text-xs sm:text-sm leading-relaxed pr-2" style={{ wordBreak: 'break-word' }}>
                            {selectedFile.content}
                        </pre>
                    </div>
                ) : (
                    <div className="h-full flex items-center justify-center text-pink-600 text-xs sm:text-sm">
                        Select a file to view
                    </div>
                )}
            </div>
        </div>
    );
}
