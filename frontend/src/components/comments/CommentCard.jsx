import axios from "axios";
import { useEffect, useState } from "react";
import { profileBackground } from "../../pages/utils/profileBackground";
import CommentSkeleton from "../skeletons/CommentSkeleton";
import { timeAgo } from "../../pages/utils/timeAgo";
import { BACKEND_URL } from "../../../config";

const CommentCard = ({comment, createdAt, userId}) => {
    const [username, setUsername] = useState("");
    const [initial, setInitial] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${BACKEND_URL}/auth/user/${userId}`)
            .then(res => {
                setUsername(res.data.user.username)
                // console.log(res.data.user.username);
                // console.log(res.data.user.username[0]);
                setInitial(res.data.user.username[0])
                setLoading(false);
            })
            .catch(err => {
                console.log("Error fetching the comment: ", err);
                setLoading(false);
            })
    })

    const bgColorClass = profileBackground(username)

    if(loading){
        return (
            <div>
                <CommentSkeleton />
            </div>
        )
    }
    return (
        <div>
            <div className='bg-gray-200 dark:bg-[#0a0b10] flex gap-2 px-2 py-3.5'>
                {/* <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full h-6 w-6 lg:h-8 lg:w-8">
                    <span className="text-[1.2rem] lg:text-[1.4rem] text-gray-800 dark:text-gray-300">{initial.toUpperCase()}</span>
                </div> */}
                <div className='h-16 w-10'>
                    <div className={`${bgColorClass} text-white text-[1.4rem] py-1 mt-1 flex justify-center items-center rounded-full dark:text-white`}>
                        {initial.toUpperCase()}
                    </div>
                </div>
                <div>
                    <div className='flex items-center'>
                        <p className='text-black dark:text-white font-semibold text-[1.2rem]'>{username}</p>
                        <span className='flex items-center justify-center px-1 dark:text-gray-200 text-[0.6rem]'> • </span>
                        <p className='text-gray-600 dark:text-gray-300'>{timeAgo(createdAt)}</p>
                    </div>
                    <div className='text-gray-800 dark:text-white text-[1.1rem]'>
                        {comment}
                    </div>
                </div>
            </div>
            <p className='h-[1.3px] w-full max-w-screen-lg mx-auto bg-gray-300 dark:bg-gray-900'></p>
        </div>
    )
}

export default CommentCard