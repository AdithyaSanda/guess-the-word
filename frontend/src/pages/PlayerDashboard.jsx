import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api';
import wordQuest from "../assets/wordQuest.png";
import wordQuestLogo from "../assets/wordQuestLogo.png"

const PlayerDashboard = () => {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showLimitModal, setShowLimitModal] = useState(false);

    const startGame = async () => {
        setError("");
        setLoading(true);

        try {
            const response = await api.post(`/api/player/game/start`);

            const gameId = response.data.gameId;

            navigate(`/game/${gameId}`);
        }
        catch(error) {
            setError(error.response?.data?.message || "Unable to start game.");

            if (error.response?.status === 400 || error.response?.status === 403) {
                setShowLimitModal(true);
            }
        }
        finally {
            setLoading(false);
        }
    }

    const logout = async () => {

        try {
            await api.post("/api/auth/logout");
        } catch (error) {
            console.error(error);
        }

        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/");
    }

    return (
        <div className='w-full min-h-screen flex flex-col items-center justify-center gap-4'>
          
                <img src={wordQuestLogo} alt="wordQuestLogo" className='w-30'/>
                <img src={wordQuest} alt='wordQuest' className='w-100 h-auto object-contain'/>
                <h2 className='text-4xl font-semibold'>Welcome, {username}</h2>

                <div className='flex flex-col items-center gap-2 mt-2'>
                    <p className='text-2xl'>Guess the 5-letter word.</p>
                    <p className='text-2xl'>You can play upto 3 games per day.</p>
                </div>

                <div className='flex gap-2 mt-4'>
                    <button className='border border-white p-3 w-40 rounded-full hover:bg-[#3a3a3c] font-semibold cursor-pointer' onClick={logout}>Logout</button>
                    <button className='border border-white p-3 w-40 rounded-full hover:bg-[#3a3a3c] font-semibold cursor-pointer' onClick={startGame} disabled={loading}>{loading ? "Starting Game..." : "Start Game"}</button>
                </div>


                {showLimitModal && (
                <div
                    className="
                        fixed
                        inset-0
                        z-50
                        flex
                        items-center
                        justify-center
                        bg-black/60
                        px-4
                    "
                >

                    <div
                        className="
                            w-full
                            max-w-md
                            rounded-xl
                            border-2
                            border-[#3a3a3c]
                            bg-[#181818]
                            p-8
                            text-center
                            shadow-2xl
                        "
                    >

                        <div className="mb-4 text-4xl">
                            🎮
                        </div>

                        <h2 className="text-2xl font-bold text-white">
                            Daily Limit Reached
                        </h2>

                        <p className="mt-4 text-gray-400">
                            You have already played 3 games today.
                            Come back tomorrow to play again.
                        </p>

                        <button
                            onClick={() => setShowLimitModal(false)}
                            className="
                                mt-6
                                rounded-lg
                                border
                                border-white
                                px-10
                                py-2.5
                                font-semibold
                                text-white
                                transition
                                hover:bg-[#3a3a3c]
                                cursor-pointer
                            "
                        >
                            OK
                        </button>

                    </div>

                </div>
            )}
                
            

        </div>

    )
}

export default PlayerDashboard