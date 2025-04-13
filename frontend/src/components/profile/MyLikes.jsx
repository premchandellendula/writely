import axios from "axios";
import { useEffect, useState } from "react";
import Spinner from "../skeletons/Spinner";
import MyBlogCard from "./MyBlogCard";
import { BACKEND_URL } from "../../../config";

const MyLikes = () => {
    const [likes, setLikes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get(`${BACKEND_URL}/user/mylikes`, {
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

export default MyLikes