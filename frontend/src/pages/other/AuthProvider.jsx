import { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({children}){
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem("auth")

        if(auth === "true"){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
    }, [])

    const login = () => {
        localStorage.setItem("auth", "true")
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("auth")
        localStorage.removeItem("token")
        setIsAuthenticated(false)
        navigate('/')
    }

    return (
        <AuthContext.Provider value={{login, logout, isAuthenticated}}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);