'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const SoundContext = createContext({
    soundEnabled: true,
    toggleSound: () => { },
    playHover: () => { },
    playClick: () => { },
});

export function SoundProvider({ children }) {
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Persist audio preference
    useEffect(() => {
        const saved = localStorage.getItem('sound-enabled');
        if (saved !== null) {
            // eslint-disable-next-line
            setSoundEnabled(saved === 'true');
        }
    }, []);

    const toggleSound = () => {
        setSoundEnabled(prev => {
            localStorage.setItem('sound-enabled', !prev);
            return !prev;
        });
    };

    // Minimal "Tech" Click Sound (Oscillator)
    const playTone = (freq, type, duration) => {
        if (!soundEnabled || typeof window === 'undefined') return;
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        if (!AudioContext) return;

        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = type;
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        gain.gain.setValueAtTime(0.05, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + duration);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + duration);
    };

    const playHover = () => {
        if (!soundEnabled) return;
        playTone(400, 'sine', 0.1); // Soft blip
        if (navigator.vibrate) navigator.vibrate(2); // Tiny feedback
    };

    const playClick = () => {
        if (!soundEnabled) return;
        playTone(600, 'square', 0.15); // Tech click
        if (navigator.vibrate) navigator.vibrate(10); // Standard feedback
    };

    return (
        <SoundContext.Provider value={{ soundEnabled, toggleSound, playHover, playClick }}>
            {children}
        </SoundContext.Provider>
    );
}

export const useSound = () => useContext(SoundContext);
