import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { timeAgo } from '../utils/timeAgo';
import { BlogSkeleton } from '../../components/skeletons/BlogSkeleton';
import Likes from '../../components/likes/Likes';
import parse from 'html-react-parser';
import DOMPurify from 'dompurify'
import Comment from '../../components/comments/Comment';
import Comments from '../../components/comments/Comments';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({})
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [initial, setInitial] = useState('')
    const [likeCount, setLikeCount] = useState(0);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/blogs/blog/${id}`)
            .then(res => {
                setBlog(res.data.blog)
                setInitial(res.data.blog.author.name[0]);
                setContent(res.data.blog.content)
                setName(res.data.blog.author.name)
                setLikeCount(res.data.blog.likeCount)
                setUsername(res.data.blog.author.username)
                // console.log(res.data.blog.likeCount);
                setLoading(false)
                // console.log(res.data.blog.author.name)
                // console.log(res.data.blog.content)
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false)
            })
    }, [])

    if(loading){
        return (
            <div className='dark:bg-[#0a0b10]'>
                <Navbar />
                <div className='h-screen pt-24'>
                    <BlogSkeleton />
                    <Comment />
                    <p className='h-[1px] w-full max-w-screen-lg mx-auto bg-gray-100 mb-10 mt-12 dark:bg-gray-600'></p>
                </div>
            </div>
        )
    }
    return (
        <div className='w-full dark:bg-[#0a0b10] min-h-screen'>
            <Navbar />
            <div className="flex justify-center py-12 pt-26">
                <div className="grid grid-cols-12 w-[95%] lg:w-[80%] gap-8 m-auto px-10 max-w-screen-xl">
                    <div className="col-span-9">
                        <div className="text-[2rem] lg:text-[2.5rem] font-bold dark:text-gray-200">
                            {blog.title}
                        </div>
                        <div className='flex'>
                            <div className="text-gray-600 pt-2 text-[1rem] lg:text-[1.1rem] pb-0.5 dark:text-gray-400">
                                Posted {timeAgo(blog.createdAt)}
                            </div>
                            <span className='flex items-center justify-center mt-1.5 px-1 dark:text-gray-400'> • </span>
                            <div className="text-gray-600 text-[1rem] lg:text-[1.1rem] pt-2 font-normal pb-0.5 dark:text-gray-400">
                                {`${Math.ceil(content.length / 1000)} mins read`}
                            </div>
                        </div>
                        <div className="text-[1.1rem] lg:text-xl text-justify font-normal pt-7 text-gray-800 dark:text-gray-300">
                            {parse(DOMPurify.sanitize(blog.content))}
                        </div>
                        <div className='mt-8'>
                            <Likes id={id} initialCount={likeCount} />
                        </div>
                    </div>
                    <div className="col-span-3">
                        <div className="text-gray-700 dark:text-gray-300 text-[0.9rem] lg:text-[1rem]">
                            Author
                        </div>

                        <div className="flex flex-col">
                            <div className="pr-3 gap-1 mt-2 flex items-center justify-start w-fit">
                                <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full h-6 w-6 lg:h-8 lg:w-8">
                                    <span className="text-[1.2rem] lg:text-[1.4rem] text-gray-800 dark:text-gray-300">{initial.toUpperCase()}</span>
                                </div>
                                <Link to={`/${username}`}>
                                    <div className="text-[1.5rem] lg:text-[1.7rem] pb-1.5 font-semibold dark:text-gray-300 hover:underline">
                                        {name || "Anonymous"}
                                    </div>
                                </Link>
                            </div>
                            <div>
                                <div className="pt-2 text-gray-700 dark:text-gray-400 text-justify text-[0.8rem] lg:text-[1rem]">
                                    Random sentence just to fill the desc of the author
                                </div>
                            </div>
                        </div>       
                    </div>
                </div>
            </div>

            <Comment />
            <p className='h-[1px] w-full max-w-screen-lg mx-auto bg-gray-100 mb-10 mt-12 dark:bg-gray-600'></p>
            <Comments id={id} />
        </div>
    )
}

export default Blog