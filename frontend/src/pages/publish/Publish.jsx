import axios from "axios"
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/navbar/Navbar";
import Footer from "../../components/footer/Footer";
import TextEditor from "../../components/RTE/TextEditor";
import parse from 'html-react-parser'
import DOMPurify from 'dompurify'
import { toast } from "sonner";

const Publish = () => {
    const [title, setTitle] = useState("");
    const [content, setContent] = useState("");
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    return <div className="dark:bg-[#0a0b10]">
        <Navbar />
        <div className="flex justify-center pt-32">
            <div className="w-[92%] lg:w-[83%]">
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:bg-gray-900 dark:text-white dark:border-none" placeholder="Title" />
            </div>
        </div> 
        <div className="flex justify-center pt-8">
            {/* <TextArea 
            value={content}
            onChange={(e) => {
                setContent(e.target.value)
            }} /> */}

            <TextEditor content={content} setContent={setContent} />
        </div>

        {/* <div className="dark:text-white">
            {parse(DOMPurify.sanitize(content))}
        </div> */}

        <div className="flex justify-center">
            <div className=" w-[92%] lg:w-[83%]">
                <button
                onClick={async () => {
                    if(title === "" || content === ""){
                        alert("Please add the title and content")
                        return;
                    } 
                    setLoading(true)

                    try{
                        const response = await axios.post("http://localhost:3000/api/v1/blogs/", {
                            title,
                            content
                        }, 
                        {
                            headers: {
                                Authorization: "Bearer " + localStorage.getItem("token")
                            }
                        })
                        toast.success(response.data.message)
                        navigate("/")
                    }catch(e){
                        console.error('Failed to signup:', e);
                        toast.success(e.response.data.message)
                    }finally{
                        setLoading(false);
                    }
                }}
                type="submit" className="inline-flex items-center px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 my-4 cursor-pointer">
                    {loading ? (
                        <svg aria-hidden="true" role="status" className="inline w-7 ml-2 h-5 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                        <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                        </svg>
                    ): (
                        "Publish"
                    )}
                </button>
            </div>
        </div>

        <Footer />
    </div> 
}

function TextArea({onChange, value}){
    const handleInput = (e) => {
        const textarea = e.target;
        textarea.style.height = "auto";
        textarea.style.height = `${textarea.scrollHeight}px`;
        onChange(e);
    };
    return <div className="max-w-screen-lg w-[85%] lg:w-full">
        <textarea value={value} onChange={handleInput} rows={15} className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-800 dark:bg-gray-900 dark:text-white dark:border-none" placeholder="Write your thoughts here..." style={{ maxHeight: "300px" }}></textarea>
    </div>
    
}

export default Publish