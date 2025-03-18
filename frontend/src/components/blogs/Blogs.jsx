import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Navbar from '../navbar/Navbar'
import BlogCardSkeleton from '../skeletons/BlogCardSkeleton'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/blogs/blogs")
            .then(res => {
                setBlogs(res.data.blogs.reverse())
                setLoading(false)
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            });
    }, [])

    if(loading){
        return (
            <div className="dark:bg-[#0a0b10] pt-5">
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
            </div>
        )
    }

    return (
        <div className="flex justify-center py-4 dark:bg-[#0a0b10]">
            <div className="flex flex-col justify-center">
                {blogs.map(blog => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.username || "Anonymous User"} title={blog.title} content={blog.content} createdAt={blog.createdAt} />)}
            </div>
        </div>
    )
}


export default Blogs