import React from 'react'

const InputBox = ({placeholder, onChange}) => {
    return (
        <div className='py-3 dark:text-gray-300'>
            <input onChange={onChange} type="text" placeholder={placeholder} className='w-full h-10 px-2 py-1 border rounded border-slate-200 focus:ring-2 focus:ring-gray-500 focus:outline-none dark:bg-[#f9fafb0d] dark:text-white dark:border-none' />
        </div>
    )
}

export default InputBox