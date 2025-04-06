import { Link } from "react-router-dom";
import { timeAgo } from "../../pages/utils/timeAgo";

const BlogCard = ({id, authorName, title, content, createdAt}) => {
    if (!authorName) authorName = "Anonymous";
    if (!content) content = "";
    if (!createdAt) createdAt = new Date();
    return <Link to={`/blog/${id}`}>
        <div className="bg-gray-50 hover:shadow-xl hover:scale-[1.01] transition delay-100 group duration-300 ease-in-out dark:bg-[#0a0b10] rounded-lg px-3 py-5 my-3 shadow-md lg:w-screen max-w-screen-md cursor-pointer w-[85%] m-auto dark:border dark:border-gray-800">
            <div className="flex items-center">
                <Avatar name={authorName} /> 
                <Username authorName={authorName} />
                <span className="text-black dark:text-gray-300 ml-2"> • </span>
                <div className="pl-2 font-thin text-gray-500 dark:text-gray-200 text-[0.8rem] lg:text-sm flex flex-col justify-center">
                    Posted {timeAgo(createdAt)}
                </div>
            </div>

            <div className="text-[1.15rem] lg:text-[1.4rem] group-hover:text-titleblue font-semibold pt-2 my-1 dark:text-gray-200">
                {title}
            </div>

            <div className="text-[0.9rem] lg:text-[1.1rem] font-normal text-gray-600 dark:text-gray-200">
                {content.slice(0, 100) + "..."}
            </div>

            <div className="text-gray-600 dark:text-gray-300 text-sm font-normal pt-3">
                {`${Math.ceil(content.length / 1000)} mins read`}
            </div>
        </div>
    </Link>
}

export function Avatar({ name }){
    const initial = name && name.length > 0 ? name[0].toUpperCase() : "A";
    return <div className="relative inline-flex items-center justify-center w-7 h-7 overflow-hidden mt-1 bg-gray-200 dark:bg-gray-600 rounded-full">
        <span className="text-md text-gray-600 dark:text-gray-200 mb-0.5">{name[0].toUpperCase()}</span>
    </div>
    
}

function Username({authorName}){
    const displayName = authorName && authorName.length > 0 
        ? authorName[0].toUpperCase() + authorName.slice(1) 
        : "Anonymous";
    return (
        <Link to={`/${authorName}`}>
            <div className="font-extralight pl-2 text-[1.1rem] lg:text-[1.2rem] text-center text-black dark:text-gray-300 flex flex-col items-center justify-center hover:underline">
                {authorName[0].toUpperCase() + authorName.slice(1)}
            </div>
        </Link>
    )
}

export default BlogCard