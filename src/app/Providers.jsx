'use client'
import { createContext, useState } from 'react'
import Menu from './components/Menu/Menu';
import GradientBlur from "./components/GradientBlur/GradientBlur";
import OverlayFX from './components/OverlayFX/OverlayFX'; // ✅ aggiunto qui

export const DarkModeContext = createContext();

const Providers = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);

        const canvas = document.getElementById("sketch");
        if (canvas) {
            canvas.style.backgroundColor = darkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.5)';
            canvas.style.branchColor = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,1)';
        }

        const logoContainer = document.getElementById("logo-container");
        if (logoContainer) {
            const svg = logoContainer.querySelector("svg");
            if (svg) svg.style.fill = darkMode ? "#000000" : "#ffffff";
        }
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <OverlayFX /> {/* ✅ Gradient + Grain globali */}
            <Menu />
            <GradientBlur />
            {children}
        </DarkModeContext.Provider>
    )
}

export default Providers;
