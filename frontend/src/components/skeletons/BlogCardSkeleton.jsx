import React from 'react'

const BlogCardSkeleton = () => {
    return (        
        <div role="status" className="w-[56%] m-auto my-2 mb-5 p-4 border rounded-lg border-gray-300 dark:border-gray-800 animate-pulse">
            <div className="flex items-center mt-4 mb-2">
                <svg className="w-10 h-10 me-3 text-gray-300 dark:text-gray-800" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"/>
                </svg>
                <div>
                    <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-32 mb-2"></div>
                </div>
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-[80%] mb-4"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 mb-2.5 mt-3"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 mb-2.5 mt-3"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[560px] mb-2.5 mt-3"></div>
            <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[260px] my-3"></div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}

export default BlogCardSkeleton