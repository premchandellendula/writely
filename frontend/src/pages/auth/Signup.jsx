import React, { useState } from 'react'
import Heading from '../../components/auth/Heading'
import InputBox from '../../components/auth/InputBox'
import PasswordInput from '../../components/auth/PasswordInput'
import Button from '../../components/auth/Button'
import BottomWarning from '../../components/auth/BottomWarning'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import ThemeBtn from '../../components/navbar/ThemeBtn'
import { toast } from 'sonner'

const Signup = () => {
    const [username, setUsername] = useState("");
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false)
    return (
        <div className='min-h-screen pt-2 bg-gray-100 dark:bg-[#0a0b10] flex flex-col'>
            <div className='w-20 flex justify-end'>
                <ThemeBtn />
            </div>
            <div className='flex flex-col justify-center mt-8'>
                <div className='bg-white dark:bg-[#f9fafb0d] w-[85%] m-auto md:w-[30rem] h-max text-center rounded-lg shadow-xl px-[3rem] py-[2rem]'>
                    <Heading label={"Create your account"} />
                    <InputBox onChange={(e) => {
                        setUsername(e.target.value)
                    }} placeholder={"Username"} />
                    <InputBox onChange={(e) => {
                        setName(e.target.value)
                    }} placeholder={"Full Name"} />
                    <InputBox onChange={(e) => {
                        setEmail(e.target.value)
                    }} placeholder={"E-mail address"} />
                    <PasswordInput onChange={(e) => {
                        setPassword(e.target.value)
                    }} placeholder={"Password"} />
                    <Button 
                    loading={loading}
                    onClick={async () => {
                        setLoading(true)
                        try{
                            const response = await axios.post("http://localhost:3000/api/v1/auth/signup", {
                                username,
                                name,
                                email,
                                password
                            })

                            const token = response.data.token
                            localStorage.setItem("token", token)
                            toast.success(response.data.message)
                            if(email && password){
                                navigate('/')
                            }
                        }catch(err){
                            console.log("Failed to signup: ", err);
                            toast.error(err.response.data.message)
                        }finally{
                            setLoading(false)
                        }
                    }} label={"Signup"} />
                    <BottomWarning label={"Already have an account?"} buttonText={"Sign In"} to={'/signin'} />
                </div>
            </div>
        </div>
    )
}

export default Signup