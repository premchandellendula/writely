import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import Navbar from '../../components/navbar/Navbar';
import { timeAgo } from '../utils/timeAgo';
import { useAuth } from '../other/AuthProvider';
import { BlogSkeleton } from '../../components/skeletons/BlogSkeleton';
import CommentsSpinner from '../../components/skeletons/CommentsSpinner';
import CommentSkeleton from '../../components/skeletons/CommentSkeleton';
import Footer from '../../components/footer/Footer';
import { profileBackground } from '../utils/profileBackground';

const Blog = () => {
    const {id} = useParams();
    const [blog, setBlog] = useState({})
    const [name, setName] = useState("")
    const [content, setContent] = useState("")
    const [initial, setInitial] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/blogs/blog/${id}`)
            .then(res => {
                setBlog(res.data.blog)
                setInitial(res.data.blog.author.name[0]);
                setContent(res.data.blog.content)
                setName(res.data.blog.author.name)
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
                <div className='mt-10 h-screen'>
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
            <div className="flex justify-center py-12">
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
                        <div className="text-[1.1rem] lg:text-xl text-justify font-normal pt-4 text-gray-800 dark:text-gray-100">
                            {blog.content}
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
                                <div className="text-[1.5rem] lg:text-[1.7rem] pb-1.5 font-semibold dark:text-gray-300">
                                    {name || "Anonymous"}
                                </div>
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

function Comments({id}){
    const [comments, setComments] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/comments/${id}`)
            .then(res => {
                setComments(res.data.comments)
                setLoading(false);
            })
            .catch(err => {
                console.error("Error fetching comments:", err);
                setLoading(false)
            })
    }, [])

    if(loading){
        return (
            <div>
                <CommentsSpinner />
            </div>
        )
    }
    return (
        <div className='w-[74%] m-auto pb-6'>
            {comments.map((comment, idx) => <CommentCard key={idx} comment={comment.comment} createdAt={comment.createdAt} userId={comment.userId} />)}
            <Footer />
        </div>
    )
}

function CommentCard({comment, createdAt, userId}){
    const [username, setUsername] = useState("");
    const [initial, setInitial] = useState("");
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`http://localhost:3000/api/v1/auth/user/${userId}`)
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

function Comment(){
    const [comment, setComment] = useState("")
    const [commentLoading, setCommentLoading] = useState(false);
    const {id} = useParams();
    // console.log(id)
    const { isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const isCommentValid = comment.trim() || "";
    // console.log(isCommentValid)

    const handleInteraction = () => {
        if(!isAuthenticated){
            alert("Please signin to continue")
            navigate('/signin')
        }
    }
    return (
        <div className='w-[85%] lg:w-[74%] m-auto'>
            <div className='bg-gray-200 w-full px-4 py-2 rounded-md shadow-md dark:bg-[#11131c] dark:text-white dark:border-none focus:outline-none focus:ring-0 flex items-center'>
                <input 
                value={comment}
                onClick={handleInteraction}
                onChange={(e) => {
                    setComment(e.target.value)
                }} 
                type="text" 
                placeholder='Enter the Comment' 
                className='flex-[85%] text-[1rem] lg:text-[1.1rem] bg-transparent focus:outline-none h-10' />

                <button 
                disabled={!isCommentValid}
                onClick={async() => {
                    setCommentLoading(true)
                    if(!isCommentValid) return;

                    if(!isAuthenticated){
                        navigate("/signin")
                    }

                    try{
                        // console.log("1")
                        const response = await axios.post("http://localhost:3000/api/v1/comments", {
                            comment,
                            blogId: parseInt(id)
                        }, {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        alert("Comment added successfully")
                        setComment("")
                    }catch (err) {
                        console.error("Error posting comment:", err);
                        alert("Failed to post comment. Please try again.");
                    }finally{
                        setCommentLoading(false)
                    }
                }} className={`flex-[15%] h-10 px-2 lg:px-3 py-1 rounded-full text-white dark:text-black font-semibold text-[0.8rem] md:text-[1.1rem] ${isCommentValid ? "bg-gray-900 dark:bg-gray-50 cursor-pointer"
                    : "cursor-not-allowed bg-gray-400 dark:bg-gray-600"}`}>
                    {commentLoading ? (
                        <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-black animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                    ) : (
                        "Respond"
                    )}
                </button>
            </div>
        </div>
    )
}

export default Blog