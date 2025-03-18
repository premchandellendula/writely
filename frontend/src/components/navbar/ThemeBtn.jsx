import React from 'react'
import { useTheme } from '../../pages/other/ThemeProvider'

const ThemeBtn = () => {
    const { themeMode, lightTheme, darkTheme } = useTheme();

    const onChangeBtn = () => {
        if (themeMode === 'light') {
            darkTheme()
        }
        if(themeMode === 'dark') {
            lightTheme()
        }
    }


    return (
        <div onClick={onChangeBtn} className={`rounded-full p-2 mr-2 flex justify-center items-center cursor-pointer ${themeMode === "light" ? "bg-gray-200" : "bg-[#1c1d22]"}`}>
        {themeMode === "light" ? (
            <i className="bx bxs-sun text-yellow-400 text-[1.3rem]"></i>
        ) : (
            <i className="bx bxs-moon text-blue-200 text-[1.3rem]"></i>
        )}
    </div>
    )
}

export default ThemeBtn