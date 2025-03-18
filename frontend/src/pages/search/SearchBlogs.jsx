import React, { useEffect, useState } from 'react'
import Navbar from '../../components/navbar/Navbar'
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import BlogCard from '../../components/blogs/BlogCard';
import BlogCardSkeleton from '../../components/skeletons/BlogCardSkeleton';
import Footer from '../../components/footer/Footer';

const SearchBlogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(false);
    const location = useLocation();

    const searchParams = new URLSearchParams(location.search);
    const searchTerm = searchParams.get("searchTerm");

    useEffect(() => {
        if(searchTerm){
            setLoading(true);
            
            axios.get(`http://localhost:3000/api/v1/search?searchTerm=${encodeURIComponent(searchTerm)}`)
                .then(res => {
                    setBlogs(res.data.blogs)
                    setLoading(false);
                })
                .catch((err) => {
                    console.error("Error fetching search results:", err);
                })
        }
    }, [searchTerm])

    if(loading){
        return (
            <div>
                <Navbar />
                <div className="dark:bg-[#0a0b10] pt-5">
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                    <BlogCardSkeleton />
                </div>
            </div>
        )
    }
    return (
        <div>
            <Navbar />
            <div className='h-full dark:bg-[#0a0b10] min-h-screen'>
                {blogs.length > 0 && 
                    <div className='text-xl pt-4 dark:text-white w-[85%] m-auto'>        
                        results for <span className='font-semibold text-orange-400'>"{searchTerm}"</span>
                    </div>
                }
                <div className="flex justify-center py-4 dark:bg-[#0a0b10]">
                    <div className="flex flex-col justify-center">
                        {blogs.length === 0 ? (
                            <p className='text-2xl dark:text-white mt-40'>There are no blogs with "{searchTerm}"</p>
                        ) : (
                            ""
                        )}
                        {blogs.map(blog => <BlogCard key={blog.id} id={blog.id} authorName={blog.author.username || "Anonymous User"} title={blog.title} content={blog.content} createdAt={blog.createdAt} />)}
                    </div>
                </div>
                <Footer />
            </div>
        </div>
    )
}

export default SearchBlogs