import { Link } from "react-router-dom"

const AuthorInfoSection = ({initial, name, username, isMobile}) => {
    return (
        <div>
            <div className="text-gray-700 dark:text-gray-300 text-[0.9rem] lg:text-[1rem]">
                Author
            </div>

            <div className="flex flex-col">
                <div className="pr-3 gap-1 mt-2 flex items-center justify-start w-fit">
                    <div className="flex items-center justify-center bg-gray-300 dark:bg-gray-600 rounded-full h-6 w-6 lg:h-8 lg:w-8">
                        <span className="text-[1.2rem] lg:text-[1.4rem] text-gray-800 dark:text-gray-300">{initial.toUpperCase()}</span>
                    </div>
                    <Link to={`/${username}`}>
                        <div className="text-[1.5rem] lg:text-[1.7rem] pb-1.5 font-semibold dark:text-gray-300 hover:underline">
                            {name || "Anonymous"}
                        </div>
                    </Link>
                </div>
                <div>
                    <div className="pt-2 text-gray-700 dark:text-gray-400 text-justify text-[0.8rem] lg:text-[1rem]">
                        Random sentence just to fill the desc of the author
                    </div>
                </div>
            </div> 
        </div>
    )
}

export default AuthorInfoSection