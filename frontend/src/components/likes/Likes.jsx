import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Likes = ({id, initialLiked=false, initialCount=0}) => {
    const [likeCount, setLikeCount] = useState(initialCount);
    const [liked, setLiked] = useState(initialLiked);
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    // console.log(initialCount)

    useEffect(() => {
        const checkLikeStatus = async () => {
            try{
                const response = await axios.get(`http://localhost:3000/api/v1/likes/liked/${id}`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })
                setLiked(response.data.liked)
                console.log(response.data.liked)
            }catch(err){
                console.error("Error checking like status: ", err)
            }
        }

        checkLikeStatus();
    }, [id])

    const handleBlogLike = async () => {
        // alert("Clicked")
        if(!localStorage.getItem("token")){
            alert('Please log in to like this blog');
            navigate('/signin')
            return;
        }
        setLoading(true);
        try{
            // For the UI update
            setLiked(!liked)
            setLikeCount(liked ? likeCount - 1 : likeCount + 1);
            const res = await axios.post(`http://localhost:3000/api/v1/likes/like/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })

            // for the server update
            setLiked(res.data.liked);
            setLikeCount(res.data.likeCount);
        }catch(err){
            console.log("Error toggling like: ", err)

            // revoking when there is an error
            setLiked(!liked)
            setLiked(liked ? likeCount + 1 : likeCount - 1)
        }
        finally{
            setLoading(false)
        }
        
    }
    return (
        <div className='flex items-center'>
            <button 
            disabled={loading}
            className="focus:outline-none transition transform hover:scale-105 cursor-pointer"
            aria-label={liked ? "Unlike" : "Like"}
            onClick={handleBlogLike}>
                <i className={`bx ${liked ? 'bxs-heart text-red-500' : 'bx-heart dark:text-gray-200'} text-[1.7rem]`}></i>
            </button>
            <span className='dark:text-gray-300 text-[1.3rem] pb-1 mx-1'>{likeCount}</span>
        </div>
    )
}

export default Likes