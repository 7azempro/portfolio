import React from 'react';
import { LanguageProvider } from './contexts/LanguageContext';
import SmoothScroll from './components/SmoothScroll';
import Navbar from './components/Navbar';
import BentoLayout from './components/BentoLayout';
import Contact from './components/Contact'; // Keep contact footer just in case, though Bento has its own.

function App() {
    return (
        <LanguageProvider>
            <SmoothScroll>
                <main style={{ backgroundColor: 'var(--bg-color)', minHeight: '100vh', color: 'var(--text-color)', transition: 'background-color 0.5s ease, color 0.5s ease' }}>
                    <Navbar />
                    <BentoLayout />
                </main>
            </SmoothScroll>
        </LanguageProvider>
    );
}

export default App;
