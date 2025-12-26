import { useState, useEffect } from 'react';

export function useWidgetState() {
    // Clarity / Visibility State
    const [isOpen, setIsOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('contact'); // Default to Quick Actions

    // Positioning State (Persisted)
    const [widgetPosition, setWidgetPosition] = useState({ isTop: false, isRight: true });

    // Accessibility State
    const [textScale, setTextScale] = useState(1);
    const [acModes, setAcModes] = useState([]); // 'high-contrast', 'invert', 'grayscale', 'yellow-black', 'reduce-motion'
    const [isReading, setIsReading] = useState(false);
    const [guide, setGuide] = useState(false); // false | 'ruler' | 'spotlight'
    const [soundEnabled, setSoundEnabled] = useState(true);

    // Persist Position & A11y Settings
    useEffect(() => {
        const savedPos = localStorage.getItem('hw_pos');
        if (savedPos) setWidgetPosition(JSON.parse(savedPos));

        const savedA11y = localStorage.getItem('hw_a11y');
        if (savedA11y) {
            const { scale, modes, sound: savedSound } = JSON.parse(savedA11y);
            if (scale) setTextScale(scale);
            if (modes) setAcModes(modes);
            if (savedSound !== undefined) setSoundEnabled(savedSound);
        } else {
            // Smart Defaults (Auto-Detect System Preferences)
            const newModes = [];
            if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
                newModes.push('reduce-motion');
            }
            if (window.matchMedia('(prefers-contrast: more)').matches) {
                newModes.push('high-contrast');
            }
            if (newModes.length > 0) setAcModes(newModes);
        }
    }, []);

    // Save on Change
    useEffect(() => {
        localStorage.setItem('hw_pos', JSON.stringify(widgetPosition));
    }, [widgetPosition]);

    useEffect(() => {
        localStorage.setItem('hw_a11y', JSON.stringify({ scale: textScale, modes: acModes, sound: soundEnabled }));

        // Apply Global A11y Classes to HTML (Matches globals.css selectors)
        document.documentElement.classList.remove('grayscale-mode', 'invert-mode', 'high-contrast', 'yellow-black-mode', 'reduce-motion', 'reading-guide');
        document.body.style.filter = ''; // Reset inline filter if any

        if (acModes.includes('grayscale')) document.documentElement.classList.add('grayscale-mode');
        if (acModes.includes('invert')) document.documentElement.classList.add('invert-mode');
        if (acModes.includes('high-contrast')) document.documentElement.classList.add('high-contrast');
        if (acModes.includes('yellow-black')) document.documentElement.classList.add('yellow-black-mode');
        if (acModes.includes('reduce-motion')) document.documentElement.classList.add('reduce-motion');

        // Guide Logic
        if (guide) document.documentElement.classList.add('reading-guide');

        // Scale Logic
        document.documentElement.style.fontSize = `${textScale * 100}%`;

    }, [textScale, acModes, guide]);

    // SMART FEATURE: Real-time Text-to-Speech (TTS)
    useEffect(() => {
        if (!isReading) {
            window.speechSynthesis.cancel();
            return;
        }

        const handleMouseOver = (e) => {
            const target = e.target;
            // Only read significant text elements
            if (['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'BUTTON', 'A', 'LI'].includes(target.tagName) && target.innerText) {
                window.speechSynthesis.cancel(); // Stop previous
                const utterance = new SpeechSynthesisUtterance(target.innerText);
                // Try to match page language if possible, else default
                // utterance.lang = 'en-US'; 
                utterance.rate = 1.0;
                utterance.pitch = 1.0;
                window.speechSynthesis.speak(utterance);

                // Visual feedback (optional border)
                target.style.outline = '2px dashed rgba(255, 255, 0, 0.5)';
                setTimeout(() => target.style.outline = '', 1000);
            }
        };

        window.addEventListener('mouseover', handleMouseOver);
        return () => {
            window.removeEventListener('mouseover', handleMouseOver);
            window.speechSynthesis.cancel();
        };
    }, [isReading]);

    return {
        isOpen, setIsOpen,
        activeTab, setActiveTab,
        widgetPosition, setWidgetPosition,
        textScale, setTextScale,
        acModes, setAcModes,
        isReading, setIsReading,
        guide, setGuide,
        soundEnabled, setSoundEnabled
    };
}
