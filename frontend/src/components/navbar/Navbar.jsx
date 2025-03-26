import React, { useEffect, useRef, useState } from 'react'
import { useAuth } from '../../pages/other/AuthProvider'
import { Link } from 'react-router-dom'
import NormalButton from '../other/NormalButton'
import ThemeBtn from './ThemeBtn'
import SearchBar from '../search/SearchBar'
import { useBlurIn } from '../../pages/utils/animation'
import axios from 'axios'

const Navbar = () => {
    const [open, setOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const { logout, isAuthenticated } = useAuth();
    const ref = useRef(null);
    const [showSearch, setShowSearch] = useState(false);
    const blurIn = useBlurIn(300)
    const [initial, setInitial] = useState('');

    useEffect(() => {
        axios.get("http://localhost:3000/api/v1/auth/user/profile", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`
            }
        })
        .then(res => {
            console.log(res.data.user.username);
            setInitial(res.data.user.username[0] || 'U');
        })
    }), []

    useEffect(() => {
        const handleScroll = () => {
            if(window.scrollY > 5){
                setIsScrolled(true);
            }else{
                setIsScrolled(false)
            }
        }

        window.addEventListener("scroll", handleScroll)

        return () => window.removeEventListener("scroll", handleScroll)
    }, [])

    const handleClickOutside = (event) => {
        if(ref.current && !ref.current.contains(event.target)){
            setOpen(false);
        }
    }

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
    
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [])
    return (
        <div className={`border-b w-full top-0 left-0 right-0 fixed z-50 border-gray-200 dark:border-b-gray-800 flex justify-between items-center px-4 lg:px-8 py-4 ${blurIn} ${isScrolled ? 'bg-white/60 dark:bg-[#0a0b10]/30 backdrop-blur-md shadow-sm' : 'bg-transparent'}`}>
            {showSearch ? (
                <div className='flex items-center w-full'>
                    <button 
                    onClick={() => setShowSearch(false)}
                    className='text-gray-500 dark:text-white mr-2 cursor-pointer'>
                        <i className="bx bx-arrow-back text-2xl"></i>
                    </button>

                    <SearchBar />
                </div>
            ) : (
                <>
                    <Link to={'/'} className="flex flex-col justify-center text-[1.75rem] font-semibold cursor-pointer text-gray-900 dark:text-white">
                        Writely.
                    </Link>

                    <div className='hidden lg:block'>
                        <SearchBar />
                    </div>

                    <div className='flex items-center space-x-2 lg:space-x-4'>
                        <button
                            className="lg:hidden flex justify-center items-center cursor-pointer"
                            onClick={() => setShowSearch(true)}
                        >
                            <i className="bx bx-search text-3xl text-gray-500 mt-0.5"></i>
                        </button>
                        <ThemeBtn />
                        {isAuthenticated ? (
                            <div className="flex items-center gap-2">
                                <Link to={"/publish"}>
                                    <button
                                        type="button"
                                        className="text-white bg-green-600 hover:bg-green-700 focus:outline-none font-medium rounded-full text-sm px-5 py-2.5 cursor-pointer"
                                    >
                                        New
                                    </button>
                                </Link>
                                <div
                                    onClick={() => setOpen((prev) => !prev)}
                                    className="relative inline-flex items-center bg-gray-300/80 dark:bg-gray-700/50 justify-center w-10 h-10 overflow-hidden rounded-full cursor-pointer"
                                    aria-haspopup="true"
                                    aria-expanded={open}
                                >
                                    {/* <i className="bx bxs-user-circle text-gray-400/70 text-[2.9rem]"></i> */}
                                    <span className='text-[2.1rem] text-gray-600/90 dark:text-gray-300 pb-2.5 flex justify-center items-center'>{initial}</span>
                                </div>
                                {open && (
                                    <div
                                        className="absolute right-8 top-16 px-2 py-1 bg-gray-200 dark:bg-gray-600 rounded-md text-black z-100"
                                        role="menu"
                                        aria-labelledby="dropdown"
                                        ref={ref}
                                    >
                                        <p
                                            onClick={() => {
                                                logout();
                                            }}
                                            className="cursor-pointer p-2 hover:bg-gray-300 hover:dark:bg-gray-700/40 rounded-md"
                                            role="menuitem"
                                        >
                                            Logout
                                        </p>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="flex items-center space-x-2">
                                <Link to={"/signup"}>
                                    <NormalButton label={"Signup"} />
                                </Link>
                                <Link to={"/signin"} className="hidden lg:block">
                                    <NormalButton label={"Signin"} />
                                </Link>
                            </div>
                        )}
                    </div>
                </>
            )}
            
        </div>
    )
}

export default Navbar