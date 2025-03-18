import React from 'react'

const Heading = ({label}) => {
    return (
        <div className='font-semibold pb-4 text-2xl dark:text-gray-200'>
            {label}
        </div>
    )
}

export default Heading