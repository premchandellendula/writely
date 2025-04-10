import { Link } from "react-router-dom";
import { Avatar } from "../blogs/BlogCard";
import { timeAgo } from "../../pages/utils/timeAgo";
import DOMPurify from 'dompurify'

const MyBlogCard = ({id, authorName, title, content, createdAt}) => {
    const getTextContent = (html) => {
        const doc = new DOMParser().parseFromString(html, "text/html");
        return doc.body.textContent || "";
    };
    return (
        <Link to={`/blog/${id}`}>
            <div className="bg-gray-50 hover:shadow-sm transition delay-100 duration-300 ease-in-out dark:bg-[#0a0b10] py-5 my-3 lg:w-screen max-w-screen-md cursor-pointer border-b border-gray-200 dark:border-gray-900">
                <div className="flex items-center">
                    <Avatar name={authorName} /> 
                    <div className="font-extralight pl-2 text-[1.1rem] lg:text-[1.2rem] text-center text-black dark:text-gray-300 flex flex-col items-center justify-center">
                        {authorName[0].toUpperCase() + authorName.slice(1)} • 
                    </div>
                    <div className="pl-2 font-thin text-gray-500 dark:text-gray-200 text-[0.8rem] lg:text-sm flex flex-col justify-center">
                        Posted {timeAgo(createdAt)}
                    </div>
                </div>

                <div className="text-[1.15rem] lg:text-[1.4rem] font-semibold pt-2 my-1 dark:text-gray-200">
                    {title}
                </div>

                <div className="text-[0.9rem] lg:text-[1.1rem] font-normal text-gray-600 dark:text-gray-200">
                    {getTextContent(DOMPurify.sanitize(content)).slice(0,100) + "..."}
                </div>

                <div className="text-gray-600 dark:text-gray-300 text-sm font-normal pt-3">
                    {`${Math.ceil(content.length / 1000)} mins read`}
                </div>
            </div>
        </Link>
    )
}

export default MyBlogCard