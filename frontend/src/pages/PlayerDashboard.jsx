import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import api from '../services/api';

const PlayerDashboard = () => {

    const navigate = useNavigate();

    const username = localStorage.getItem("username");

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

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
        }
        finally {
            setLoading(false);
        }
    }

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        localStorage.removeItem("role");

        navigate("/");
    }

    return (
        <div>
            <header>
                <h1>Guess The Word</h1>
                <button onClick={logout}>Logout</button>
            </header>

            <main>
                <h2>Welcome, {username}</h2>

                <p>Guess the 5-letter word.</p>

                <p>You can play upto 3 games per day.</p>

                {error && <p>{error}</p>}

                <button onClick={startGame} disabled={loading}>{loading ? "Starting Game..." : "Start Game"}</button>
            </main>

        </div>

    )
}

export default PlayerDashboard