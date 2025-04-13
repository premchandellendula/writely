import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import Footer from '../../components/footer/Footer'
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton'
import ProfileInfoSection from '../../components/profile/ProfileInfoSection'
import TabButton from '../../components/profile/TabButton'
import MyBlogs from '../../components/profile/MyBlogs'
import MyLikes from '../../components/profile/MyLikes'
import { BACKEND_URL } from '../../../config'

const Profile = () => {
    const [details, setDetails] = useState({})
    const [initial, setInitial] = useState('')
    const [myBlogs, setMyBlogs] = useState([])
    const [openBlogs, setOpenBlogs] = useState(true);
    const [openLikes, setOpenLikes] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/auth/user/profile`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setDetails(res.data.user)
            // console.log(res.data.user);
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

    const handleTabChange = (tab) => {
        if(tab === "blogs"){
            setOpenBlogs(true);
            setOpenLikes(false);
        }else{
            setOpenBlogs(false);
            setOpenLikes(true)
        }
    }
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
                            <ProfileInfoSection details={details} initial={initial} isMobile={true} />
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
                            <TabButton label={"Blogs"} isActive={openBlogs} onClick={() => handleTabChange('blogs')} />
                            <TabButton label={"Likes"} isActive={openLikes} onClick={() => handleTabChange('likes')} />                            
                        </div>
                        <p className='h-[1px] w-full max-w-screen-md bg-gray-200/70 mb-10 mt-4 dark:bg-gray-900'></p>

                        {openBlogs && (
                            <div>
                                <MyBlogs id={details.id} />
                            </div>
                        )}

                        {openLikes && (
                            <div>
                                <MyLikes />
                            </div>
                        )}
                    </div>     
                </div>
            </div>
            <Footer />
        </div>
    )
}

export default Profile