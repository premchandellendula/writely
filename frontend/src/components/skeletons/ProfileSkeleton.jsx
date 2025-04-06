import React from 'react'

const ProfileSkeleton = () => {
    return (
        <div role="status" class="animate-pulse">
        <div className=' min-h-screen dark:text-white pt-20'>
            <div className='w-[80%] grid grid-cols-12 gap-4 m-auto mt-14'>
                
                <div className='col-span-12 lg:hidden order-1'>
                    <div className={`bg-gray-300/70 dark:bg-gray-800 w-18 h-18 rounded-full flex justify-center items-center text-[3.1rem] mx-auto lg:mx-0`}>
                    </div>
                    <div className='mt-6 flex flex-col justify-center items-center gap-3 text-center lg:text-left'>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                        <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>

                    {/* make it a link or a pop up  to edit profile */}
                    <div className='mt-8 text-center flex justify-center items-center lg:text-left'>
                        <div class="w-22 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                </div>

                <div className='col-span-12 lg:col-span-9 order-2 lg:order-none'>
                    <div class="h-3 bg-gray-200 rounded-full dark:bg-gray-800 w-36 mb-2 mt-4 hidden lg:block"></div>

                    <div className='mt-12 flex gap-4'>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-12"></div>
                        <div class="h-2.5 bg-gray-300 rounded-full dark:bg-gray-800 w-12"></div>
                    </div>
                    <p className='h-[1px] w-full max-w-screen-md bg-gray-200/70 mb-10 mt-4 dark:bg-gray-900'></p>
                </div> 

                <div className='hidden lg:block lg:col-span-3 order-1 lg:order-none lg:px-8'>
                    <div className={`bg-gray-300/70 dark:bg-gray-800 w-18 h-18 rounded-full flex justify-center items-center text-[3.1rem] mx-auto lg:mx-0`}>
                    </div>
                    <div className='mt-6 flex flex-col gap-3 text-center lg:text-left'>
                        <div class="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                        <div class="w-24 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>

                    {/* make it a link or a pop up  to edit profile */}
                    <div className='mt-8 text-center lg:text-left'>
                        <div class="w-22 h-2 bg-gray-200 rounded-full dark:bg-gray-800"></div>
                    </div>
                </div>      
            </div>
        </div>
        <span class="sr-only">Loading...</span>
        </div>
    )
}

export default ProfileSkeleton