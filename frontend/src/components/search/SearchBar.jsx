import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const SearchBar = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    return (
        <div className='flex rounded-md relative w-full'>
            <input 
            onKeyDown={(e) => {
                if (e.key === "Enter") {
                    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`)
                }
            }}
            value={searchTerm}
            onChange={(e) => {
                setSearchTerm(e.target.value)
            }} type="text" placeholder='Search' className='bg-gray-100 dark:bg-[#1b1d26] dark:text-white w-full lg:w-72 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-gray-400' />
            <button 
            className='absolute right-0'
            onClick={(e) => {
                if(searchTerm.trim()){
                    // if(e.key === "Enter"){
                    //     alert("Hello")
                    // }
                    navigate(`/search?searchTerm=${encodeURIComponent(searchTerm)}`)
                }
            }}>
                <i className='bx bx-search text-2xl text-gray-500 dark:text-gray-400 p-2 rounded-r-md flex items-center justify-center cursor-pointer'></i>
            </button>
        </div>
    )
}

export default SearchBar