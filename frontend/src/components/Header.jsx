import React from 'react'
import wordQuestLogo from '../assets/wordQuestLogo.png'
import wordQuest from "../assets/wordQuest.png"
import { useNavigate } from 'react-router-dom'

const Header = () => {

    const navigate = useNavigate();

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/");
    }

    return (
        <div className='h-16 border-b border-white'>
            <div className="flex mx-auto h-full max-w-4xl items-center justify-between  px-6">
                <div className='flex gap-4'>
                    <img src={wordQuestLogo} alt="wordQuestLogo" className='h-10'/>
                    <img src={wordQuest} alt="wordQuest" className='h-10 mt-2'/>
                </div>
                <button onClick={(e) => {
                    e.stopPropagation();
                    logout();
                }}
                className="
                            rounded-lg
                            border border-gray-300
                            px-4 py-2
                            text-sm font-medium
                            text-white
                            transition
                            hover:bg-[#3a3a3c]
                            cursor-pointer
                        "
                >Logout</button>
            </div>
            
        </div>
    )
}

export default Header