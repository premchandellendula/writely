import axios from 'axios'
import React, { useEffect, useState } from 'react'
import BlogCard from './BlogCard'
import Navbar from '../navbar/Navbar'
import BlogCardSkeleton from '../skeletons/BlogCardSkeleton'

const Blogs = () => {
    const [blogs, setBlogs] = useState([])
    const [loading, setLoading] = useState(true)
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0)
    const [limit, setLimit] = useState(15);

    const nextPage = () => {
        if(page === totalPages){
            return;
        }else{
            setPage(page => page + 1);
            setLoading(true);
        }
    }

    const goToPage = (index) => {
        if (index < 1 || index > totalPages || index === page) return
        setPage(index)
        setLoading(true);
    }

    const prevPage = () => {
        if(page === 1){
            return;
        }else{
            setPage(page => page - 1);
            setLoading(true);
        }
    }

    const getPageNumbers = () => {
        let pages = [];
        const maxPageButtons = 5;

        if(totalPages <= maxPageButtons){
            for(let i=1;i<=totalPages;i++){
                pages.push(i);
            }
        }else{
            pages.push(1)

            let startPage = Math.max(2, page - 1);
            let endPage = Math.min(totalPages - 1, page+1);

            if(startPage > 2){
                pages.push('...')
            }

            for(let i=startPage;i<=endPage;i++){
                pages.push(i)
            }

            if(endPage < totalPages - 1){
                pages.push('...')
            }

            if(totalPages > 1){
                pages.push(totalPages)
            }
        }

        return pages;
    }

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/pagination/posts?page=${page}&limit=${limit}`)
            .then(res => {
                setBlogs(res.data.posts.reverse())
                setTotalPages(res.data.totalPages)
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching blogs:", err);
                setLoading(false);
            })
    }, [page, limit])

    if(loading){
        return (
            <div className="dark:bg-[#0a0b10] pt-5">
                {[...Array(limit)].map((_, idx) => (
                    <BlogCardSkeleton key={idx} />
                ))}
                {/* <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton />
                <BlogCardSkeleton /> */}
            </div>
        )
    }

    return (
        <div className="flex justify-center py-4 dark:bg-[#0a0b10]">
            <div className="flex flex-col justify-center">
                {blogs.length > 0 ? (
                    blogs.map(blog => (
                        <BlogCard 
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

                <nav className='flex justify-center'>
                    <ul className='flex items-center space-x-1'>
                        <li>
                            <button
                            onClick={prevPage}
                            disabled={page === 1}
                            className={`flex items-center justify-center w-8 h-8 rounded ${page === 1 ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            aria-label="Previous page"
                            >
                                <i className="bx bx-chevron-left"></i>
                            </button>
                        </li>

                        {getPageNumbers().map((pageNum, index) => (
                            <li key={index}>
                                {pageNum === '...' ? (
                                    <span className="px-2 text-gray-500 dark:text-gray-400">...</span>
                                ) : (
                                    <button
                                    onClick={() => goToPage(pageNum)}
                                    className={`flex items-center justify-center w-8 h-8 rounded ${
                                        page === pageNum 
                                            ? 'bg-blue-600 text-white' 
                                            : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
                                    }`}
                                    >
                                        {pageNum}
                                    </button>
                                )}
                            </li>
                        ))}

                        <li>
                            <button
                            onClick={nextPage}
                            disabled={page === totalPages}
                            className={`flex items-center justify-center w-8 h-8 rounded ${page === totalPages ? 'text-gray-400 cursor-not-allowed' : 'text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'}`}
                            aria-label="Next page"
                            >
                                <i className="bx bx-chevron-right"></i>
                            </button>
                        </li>
                    </ul>
                </nav>

                {/* <div className='flex justify-center items-center gap-1'>
                    <span onClick={prevPage}>
                        <i className={`bx bx-chevron-left text-3xl bg-gray-300 dark:bg-gray-600 rounded-sm dark:text-white ${page === 1 ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 dark:bg-gray-200 hover:dark:bg-gray-700'}`}></i>
                    </span>
                    <div className="flex gap-2">
                        {Array.from({ length: totalPages }).map((_, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                                console.log(idx)
                                goToPage(idx + 1)
                            }}
                            className={`px-2 py-1 transition-all dark:text-white ${
                            page === (idx + 1) 
                                ? 'w-8 text-blue-600' 
                                : 'hover:bg-gray-400'
                            }`}
                            aria-label={`Go to slide ${idx + 1}`}
                        >{idx}</button>
                        ))}
                    </div>
                    <span onClick={nextPage}>
                        <i className={`bx bx-chevron-right text-3xl bg-gray-300 dark:bg-gray-600  rounded-sm dark:text-white ${page === totalPages ? 'cursor-not-allowed opacity-50' : 'hover:scale-105 dark:bg-gray-200 hover:dark:bg-gray-700'}`}></i>
                    </span>
                </div> */}
            </div>
        </div>
    )
}

export default Blogs