import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import axios from 'axios'
import Footer from '../../components/footer/Footer'
import { Avatar } from '../../components/blogs/BlogCard'
import { Link } from 'react-router-dom'
import { timeAgo } from '../utils/timeAgo'
import ProfileSkeleton from '../../components/skeletons/ProfileSkeleton'
import Spinner from '../../components/skeletons/Spinner'

const Profile = () => {
    const [details, setDetails] = useState({})
    const [initial, setInitial] = useState('')
    const [myBlogs, setMyBlogs] = useState([])
    const [openBlogs, setOpenBlogs] = useState(true);
    const [openLikes, setOpenLikes] = useState(false);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/auth/user/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setDetails(res.data.user)
            console.log(res.data.user);
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
                            <ProfileInfoSection details={details} initial={initial} isMobile={false} />
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

export function ProfileInfoSection({details, initial, isMobile}){
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

export function TabButton({label, isActive, onClick}){
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

export function MyBlogs({id}){
    // console.log(blogs);
    // console.log(id)
    const [blogs, setBlogs] = useState([]);
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/user/blogs/${id}`)
        .then(res => {
            setBlogs(res.data.blogs)
            setLoading(false);

        })
        .catch(err => {
            console.error("Error fetching blogs:", err);
            setLoading(false);
        })
    }, [])

    if(loading){
        return (
            <div className='dark:bg-[#0a0b10] mt-6'>
                <Spinner />
            </div>
        )
    }
    return (
        <div>
            {blogs.length > 0 ? (
                blogs.map(blog => (
                    <MyBlogCard 
                        key={blog.id} 
                        id={blog.id} 
                        authorName={blog.author.username || "Anonymous User"} 
                        title={blog.title} 
                        content={blog.content} 
                        createdAt={blog.createdAt} 
                    />
                ))
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No blog posts found.
                </div>
            )}

            {/* huhu */}
        </div>
    )
}

export function MyLikes(){
    const [likes, setLikes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/user/mylikes", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            setLikes(res.data.likes);
            // console.log(res.data.likes);
            setLoading(false);
        })
        .catch(err => {
            console.error("Error fetching blogs:", err);
            setLoading(false);
        })
    }, [])

    if(loading){
        return (
            <div className='dark:bg-[#0a0b10]'>
                <Spinner />
            </div>
        )
    }

    return (
        <div>
            {likes.length > 0 ? (
                likes.map(like => (
                    <MyBlogCard 
                        key={like.blogId} 
                        id={like.blogId} 
                        authorName={like.blog.author.username || "Anonymous User"} 
                        title={like.blog.title} 
                        content={like.blog.content} 
                        createdAt={like.createdAt} 
                    />
                ))
            ) : (
                <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                    No likes found.
                </div>
            )}

            {/* huhu */}
        </div>
    )
}

export function MyBlogCard({id, authorName, title, content, createdAt}){
    return (
        <Link to={`/blog/${id}`}>
            <div className="bg-gray-50 hover:shadow-sm transition delay-100 duration-300 ease-in-out dark:bg-[#0a0b10] py-5 my-3 lg:w-screen max-w-screen-md cursor-pointer border-b border-gray-200 dark:border-gray-900">
                <div className="flex items-center">
                    <Avatar name={authorName} /> 
                    <div className="font-extralight pl-2 text-[1.1rem] lg:text-[1.2rem] text-center text-black dark:text-gray-300 flex flex-col items-center justify-center">
                        {authorName[0].toUpperCase() + authorName.slice(1)} • 
                    </div>
                    <div className="pl-2 font-thin text-gray-500 dark:text-gray-200 text-[0.8rem] lg:text-sm flex flex-col justify-center">
                        Posted {timeAgo(createdAt)}
                    </div>
                </div>

                <div className="text-[1.15rem] lg:text-[1.4rem] font-semibold pt-2 my-1 dark:text-gray-200">
                    {title}
                </div>

                <div className="text-[0.9rem] lg:text-[1.1rem] font-normal text-gray-600 dark:text-gray-200">
                    {content.slice(0, 100) + "..."}
                </div>

                <div className="text-gray-600 dark:text-gray-300 text-sm font-normal pt-3">
                    {`${Math.ceil(content.length / 1000)} mins read`}
                </div>
            </div>
        </Link>
    )
}

export default Profile