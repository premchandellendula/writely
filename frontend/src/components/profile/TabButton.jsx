const TabButton = ({label, isActive, onClick}) => {
    return (
        <span className='relative'>
            <p 
            className={`cursor-pointer ${isActive ? 'text-gray-800 dark:text-gray-200' : 'text-gray-400 dark:text-gray-600'} hover:dark:text-white hover:text-black`}
            onClick={onClick}>
                {label}
            </p>

            {isActive && (
                <p className='absolute left-0 right-0 top-full h-[1px] w-full max-w-screen-md bg-gray-800/70 mt-4 dark:bg-gray-400'></p>
            )}
        </span>
    )
}

export default TabButton