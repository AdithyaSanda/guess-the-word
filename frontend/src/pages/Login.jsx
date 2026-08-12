import { useState } from "react"
import { Link, replace, useNavigate } from "react-router-dom"
import api from "../services/api"
import wordQuestLogo from "../assets/wordQuestLogo.png"
import wordQuest from "../assets/wordQuest.png"

const Login = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);


    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        setError("");
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setLoading(true);

        try {
            const response = await api.post(`/api/auth/login`, formData);
            const data = response.data;

            localStorage.setItem("token", data.token);
            localStorage.setItem("username", data.username);
            localStorage.setItem("role", data.role);

            if(data.role === "ADMIN") {
                navigate("/admin");
            }
            else {
                navigate("/player");
            }
        }
        catch(error) {
            setError(
                error.response?.data?.message || "Invalid username or password"
            );
        }
        finally {
            setLoading(false);
        }

        
        
    }

    return (
        <div>
            <div className='flex items-center justify-center'>
                
                
             
            </div>
            <div onSubmit={handleSubmit} className="flex flex-col justify-center min-h-dvh items-center">
                <div className='flex gap-4 mb-10'>
                    <img src={wordQuestLogo} alt="wordQuestLogo" className='h-12'/>
                    <img src={wordQuest} alt="wordQuest" className='h-12 mt-2'/>
                </div>
                <form className="inline-flex flex-col border p-10 gap-y-5 rounded">
                    <span className="text-3xl font-bold">Login</span>
                    <label htmlFor="username" className="text-xl">Username</label>
                    <input type="text" placeholder="John" name="username" value={formData.username} className="w-100 h-10 rounded border p-2" onChange={handleInputChange} required/>
                    <label htmlFor="username" className="text-xl">Password</label>
                    <input type="password" placeholder="Password" name="password" className="w-100 h-10 rounded border p-2" onChange={handleInputChange} required/>
                    {error && <p className="text-red-700">{error}</p>}
                    <button type="submit" disabled={loading} className="bg-white text-black p-2 rounded mt-5 font-bold cursor-pointer">{loading ? "Logging in..." : "Login"}</button>
                    <span>Not registered yet? <Link to={"/register"} className="underline font-bold">Register</Link></span>
                </form>
            </div>
        </div>
    )
}

export default Login