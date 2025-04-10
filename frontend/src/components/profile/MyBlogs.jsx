import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../skeletons/Spinner";
import MyBlogCard from "./MyBlogCard";

const MyBlogs = ({id}) => {
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

export default MyBlogs