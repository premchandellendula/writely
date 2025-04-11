import React from 'react'

export const BlogSkeleton = () => {
    return (        
        <div role="status" className="w-[90%] m-auto animate-pulse flex mb-8">
            <div className="grid grid-cols-12 w-[94%] lg:w-[80%] gap-8 m-auto max-w-screen-xl mt-6">
                <div className='col-span-12 lg:hidden order-1'>
                    <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-800 mb-2"></div>
                    <div className='flex items-center gap-1'>
                        <div className={`bg-gray-300/70 dark:bg-gray-800 w-8 h-8 rounded-full text-[3.1rem] lg:mx-0`}></div>
                        <div class="w-32 h-4 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                    <div className='mt-6 flex flex-col gap-3 text-center lg:text-left'>
                        <div class="w-80 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-9 order-2 lg:order-none mt-4 lg:mt-0'>
                    <div className="h-3.5 bg-gray-300 rounded-full dark:bg-gray-800 w-[80%] mb-4"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[300px] mt-2.5 mb-4"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 my-3.5"></div>
                    <div className="h-2 bg-gray-300 rounded-full dark:bg-gray-800 max-w-[630px] mb-2.5"></div>
                    
                </div>
                <div className='hidden lg:block lg:col-span-3 order-1 lg:order-none'>
                    <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-800 mb-2"></div>
                    <div className='flex items-center gap-1'>
                        <div className={`bg-gray-300/70 dark:bg-gray-800 w-8 h-8 rounded-full text-[3.1rem] lg:mx-0`}></div>
                        <div class="w-32 h-4 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                    <div className='mt-6 flex flex-col gap-3 text-center lg:text-left'>
                        <div class="w-56 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                </div>

            </div>
            <span className="sr-only">Loading...</span>
        </div>
    )
}
