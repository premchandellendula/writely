import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from './pages/landing/Landing'
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import AuthProvider from "./pages/other/AuthProvider"
import ThemeProvider from "./pages/other/ThemeProvider"
import Blog from "./pages/blog/Blog"
import Publish from "./pages/publish/Publish"
import { useEffect, useState } from "react"
import TypeWriter from "./components/other/TypeWriter"
import SearchBlogs from "./pages/search/SearchBlogs"
import Profile from "./pages/profile/Profile"
import UserProfile from "./pages/profile/UserProfile"

function App() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulate loading time (remove this in production)
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
    
        // Clean up
        return () => clearTimeout(timer);
    }, []);

    if(loading){
        return (
            <ThemeProvider>
                <div className="dark:bg-[#0a0b10]">
                    <TypeWriter text="Writely." />
                </div>
            </ThemeProvider>
        )
    }

    return (
        <BrowserRouter>
            <ThemeProvider>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                        <Route path="/blog/:id" element={<Blog />} />
                        <Route path="/publish" element={<Publish />} />
                        <Route path="/search" element={<SearchBlogs />} />
                        <Route path="/profile" element={<Profile />} />
                        <Route path="/:username" element={<UserProfile />} />
                    </Routes>
                </AuthProvider>
            </ThemeProvider>
        </BrowserRouter>
    )
}

export default App
