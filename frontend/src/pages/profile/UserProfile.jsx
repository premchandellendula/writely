import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import Footer from '../../components/footer/Footer'
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton'
import { useParams } from 'react-router-dom'
import ProfileInfoSection from '../../components/profile/ProfileInfoSection'
import MyBlogs from '../../components/profile/MyBlogs'
import { BACKEND_URL } from '../../../config'

const UserProfile = () => {
    const [details, setDetails] = useState({});
    const [initial, setInitial] = useState('');
    const [myBlogs, setMyBlogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const { username } = useParams();

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/${username}`)
        .then(res => {
            setDetails(res.data.user)
            // console.log(res.data.user.blogs);
            setMyBlogs(res.data.user.blogs);
            setInitial(res.data.user.username ? res.data.user.username[0] : '');
            setLoading(false);
        }) 
        .catch(err => {
            console.error("Error fetching details:", err);
            setLoading(false);
        })
    }, [])

    if(loading){
        return (
            <div className='dark:bg-[#0a0b10]'>
                <Navbar />
                <div>
                    <ProfileSkeleton />
                </div>
            </div>
        )
    }
    return (
        <div className='pb-4 dark:bg-[#0a0b10]'>
            <Navbar />
            <div className='min-h-screen dark:text-white pt-20'>
                <div className='w-[90%] md:w-[80%] grid grid-cols-12 gap-4 m-auto mt-8 md:mt-14'>
                    {/* left div */}
                    <div className='col-span-12 lg:col-span-3 order-1 lg:order-2'>
                        <div className='lg:hidden'>
                            <ProfileInfoSection details={details} isMobile={true} />
                        </div>

                        <div className='hidden lg:block lg:px-6'>
                            <ProfileInfoSection details={details} isMobile={false} />
                        </div>
                    </div>

                    {/* right div */}
                    <div className='col-span-12 lg:col-span-9 order-2 lg:order-1'>
                        <div className='text-[2rem] md:text-[2.3rem] hidden lg:block font-semibold'>
                            {details.name}
                        </div>

                        <div className='mt-8 flex gap-4'>
                            <p className={`cursor-pointer text-gray-800 dark:text-gray-200 hover:dark:text-white hover:text-black`}>Blogs</p>
                        </div>
                        <p className='h-[1px] w-full max-w-screen-md bg-gray-200/70 mb-10 mt-4 dark:bg-gray-900'></p>

                        <div>
                            <MyBlogs id={details.id} />
                        </div>
                    </div>     
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default UserProfile