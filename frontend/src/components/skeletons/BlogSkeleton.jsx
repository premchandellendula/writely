import React from 'react'

export const BlogSkeleton = () => {
    return (        
        <div role="status" className="w-[74%] m-auto animate-pulse flex mb-8">
            <div className='w-[73%] mt-4'>
                <div className="h-3.5 bg-gray-300 rounded-full dark:bg-gray-800 w-[80%] mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[300px] mt-2.5 mb-4"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[630px] mb-2.5"></div>
            </div>
            <div className='mt-4 w-[23%] ml-6'>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 w-[50%] mb-4"></div>
                <div className="flex items-center mb-2">
                    <svg className="w-10 h-10 me-3 text-gray-300 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                    </svg>
                    <div>
                        <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-32 mb-2"></div>
                    </div>
                </div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[230px] mb-2.5 mt-3"></div>
                <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[100px] mb-2.5 mt-3"></div>
                <span className="sr-only">Loading...</span>
            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
