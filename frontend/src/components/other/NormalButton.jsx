import React from 'react'

const NormalButton = ({label}) => {
    return (
        <div className=''>
            <button type="button" className={label === "Signup" ? `text-white bg-[#0a0b10] dark:bg-white dark:text-black dark:hover:bg-white/90 hover:bg-gray-950 focus:outline-none font-medium rounded-lg text-base px-5 py-2 me-2 shadow-md cursor-pointer` : `text-black bg-white dark:bg-[#0a0b10] dark:hover:bg-[#0e1016] dark:text-white hover:bg-gray-100 border border-gray-500 focus:outline-none font-medium rounded-lg text-base px-5 py-2 shadow-md cursor-pointer`}>{label}</button>
        </div>
    )
}

export default NormalButton