import { createContext, useContext, useEffect, useState } from "react";

const ThemeContext = createContext();

function ThemeProvider({children}){
    const [themeMode, setThemeMode] = useState(() => {
        return localStorage.getItem("themeMode") || "light"; 
    })

    const darkTheme = () => {
        setThemeMode("dark")
    }

    const lightTheme = () => {
        setThemeMode("light")
    }

    useEffect(() => {
        document.querySelector('html').classList.remove('dark', 'light')
        document.querySelector('html').classList.add(themeMode);
        localStorage.setItem("themeMode", themeMode);
    }, [themeMode])

    return <ThemeContext.Provider value={{themeMode, lightTheme, darkTheme}}>
        {children}
    </ThemeContext.Provider>
}

export default ThemeProvider;

export const useTheme = () => useContext(ThemeContext);