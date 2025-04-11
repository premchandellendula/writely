import axios from "axios"
import { useEffect, useState } from "react"
import CommentsSpinner from "../skeletons/CommentsSpinner"
import CommentCard from "./CommentCard"
import Footer from "../footer/Footer"

const Comments = ({id}) => {
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
        <div className='w-[85%] lg:w-[74%] m-auto pb-6'>
            {comments.map((comment, idx) => <CommentCard key={idx} comment={comment.comment} createdAt={comment.createdAt} userId={comment.userId} />)}
            <Footer />
        </div>
    )
}

export default Comments