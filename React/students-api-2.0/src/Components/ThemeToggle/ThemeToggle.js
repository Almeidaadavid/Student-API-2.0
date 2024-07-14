import React, { useState, useEffect } from 'react';
import { FaSun, FaMoon } from 'react-icons/fa';
import './ThemeToggle.css';

export default function ThemeToggle() {
    const [isDarkTheme, setIsDarkTheme] = useState(false);

    useEffect(() => {
        const savedTheme = localStorage.getItem('isDarkTheme') === 'true';
        setIsDarkTheme(savedTheme);
        if (savedTheme) {
            document.body.classList.add('dark-theme');
        }
    }, []);

    const toggleTheme = () => {
        const newTheme = !isDarkTheme;
        setIsDarkTheme(newTheme);
        localStorage.setItem('isDarkTheme', newTheme);
        document.body.classList.toggle('dark-theme', newTheme);
    };

    return (
        <div className='theme-toggle-icon' onClick={toggleTheme}>
            {isDarkTheme ? <FaSun /> : <FaMoon />}
        </div>
    );
};