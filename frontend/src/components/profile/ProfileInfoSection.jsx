const ProfileInfoSection = ({details, isMobile}) => {
    return (
        <div className={`flex flex-col ${isMobile ? 'items-center' : ''}`}>
            <div className=''>
                <i class='bx bxs-user-circle text-gray-400 dark:text-gray-600 text-[4.7rem]'></i>
            </div>
            <div className={`mt-2 flex flex-col gap-0 ${isMobile ? 'text-center' : ''}`}>
                <span className='text-lg md:text-[1.2rem]'>
                    {details.name}
                </span>
                <span className={`text-gray-800 dark:text-gray-50 flex gap-0 items-center ${isMobile ? 'justify-center' : ''}`}>
                    @<span className='text-base md:text-[1.1rem] pb-1'>{details.username}</span>
                </span>
            </div>

            <div className={`mt-4 ${isMobile ? 'text-center' : ''}`}>
                <p className='text-green-600 dark:hover:text-white hover:text-black cursor-pointer inline-block'>
                    Edit profile
                </p>
            </div>
        </div>
    )
}

export default ProfileInfoSection