import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import api from "../services/api"

const Register = () => {

    const navigate = useNavigate()

    const [formData, setFormData] = useState({
        username: '',
        password: ''
    })

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e) => {
        const {name, value} = e.target
        setFormData({
            ...formData,
            [name]: value
        })

        setError("");
        setSuccess("");
    }

    const validateForm = () => {
        const {username, password} = formData;

        if(username.length < 5) {
            return "Username must be at least 5 characters long.";
        }

        if(!/[A-Z]/.test(username)) {
            return "Username must contain at least one uppercase letter.";
        }

        if(!/[a-z]/.test(username)) {
            return "Username must contain at least one lowercase letter.";
        }

        if(password.length < 5) {
            return "Password must be at least 5 characters long.";
        }

        if(!/[A-Za-z]/.test(password)) {
            return "Password must contain at least one letter.";
        }

        if(!/[0-9]/.test(password)) {
            return "Password must contain at least one number.";
        }

        if(!/[$%*]/.test(password)) {
            return "Password must contain $, % or *.";
        }

        return null;
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        setError("");
        setSuccess("");

        const validationError = validateForm();

        if(validationError) {
            setError(validationError);
            return;
        }

        setLoading(true);

        try {
            const response = await api.post(`/api/auth/register`, formData);
            
            setSuccess("Registration successful! Redirecting to login...");

            setTimeout(() => {
                navigate("/");
            }, 1500);

        }
        catch(error) {
            setError(error.response?.data?.message || "Registration failed. Please try again.");
        } 
        finally {
            setLoading(false);  
        }
        
    }

    return (
        <div>
            <div onSubmit={handleSubmit} className="flex justify-center min-h-dvh items-center">
                <form className="inline-flex flex-col border p-10 gap-y-5 rounded">
                    <span className="text-3xl font-bold">Register</span>
                    <label htmlFor="username" className="text-xl">Username</label>
                    <input type="text" placeholder="John" name="username"className="w-100 h-10 rounded border p-2" onChange={handleInputChange} required/>
                    <label htmlFor="password" className="text-xl">Password</label>
                    <input type="password" placeholder="Password" name="password" className="w-100 h-10 rounded border p-2" onChange={handleInputChange} required/>
                    {error && <p>{error}</p>}
                    {success && <p>{success}</p>}
                    <button type="submit" className="bg-white text-black p-2 rounded mt-5 font-bold cursor-pointer">Register</button>
                    <span>Already a user? <Link to={"/"} className="underline font-bold">Login</Link></span>
                </form>
            </div>
        </div>
        
    )
}

export default Register