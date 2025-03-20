import React from 'react'
import Navbar from '../../components/navbar/Navbar'
import Blogs from '../../components/blogs/Blogs'
import Footer from '../../components/footer/Footer'

const Landing = () => {
    return (
        <div className='bg-white dark:bg-[#0a0b10] min-h-screen pb-4'>
            <Navbar />
            <div className='min-h-screen'>
                <Blogs />
            </div>
            <Footer />
        </div>
    )
}

export default Landing