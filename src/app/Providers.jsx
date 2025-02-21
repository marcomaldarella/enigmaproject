'use client'
import { createContext, useState } from 'react'
import Menu from './components/Menu/Menu';
import GradientBlur from "./components/GradientBlur/GradientBlur";
export const DarkModeContext = createContext();

const Providers = ({ children }) => {
    const [darkMode, setDarkMode] = useState(true);
    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
        const canvas = document.getElementById("sketch");
        if (canvas) {
            canvas.style.BackgroundColor = darkMode ? 'rgba(0,0,0,0.95)' : 'rgba(255,255,255,0.5)';
            canvas.style.BranchColor = darkMode ? 'rgba(255,255,255,0.5)' : 'rgba(0,0,0,1)';
        }

        // Cambia il colore del logo
        const logoContainer = document.getElementById("logo-container");
        if (logoContainer) {
            const svg = logoContainer.querySelector("svg");
            if (svg) svg.style.fill = darkMode ? "#000000" : "#ffffff";
        }
    };

    return (
        <DarkModeContext.Provider value={{ darkMode, toggleDarkMode }}>
            <Menu />
            <GradientBlur />
            {children}
        </DarkModeContext.Provider>
    )
}

export default Providers;