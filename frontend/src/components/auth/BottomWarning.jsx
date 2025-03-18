import React from 'react'
import { Link } from 'react-router-dom'

const BottomWarning = ({label, buttonText, to}) => {
    return (
        <div className='flex justify-center pt-2 text-[0.8rem] md:text-[0.95rem]'>
            <div className='text-gray-600 dark:text-gray-400'>
                {label}
            </div>
            <Link to={to} className='pointer underline pl-1 cursor-pointer text-[0.8rem] md:text-[0.95rem] text-gray-800 dark:text-gray-300'>{buttonText}</Link>
        </div>
    )
}

export default BottomWarning