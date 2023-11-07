import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import "./Login.css";
import Cookies from 'js-cookie';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        const xhr = new XMLHttpRequest();
        xhr.open('POST', import.meta.env.VITE_API + "/login", true);
        xhr.setRequestHeader('Content-Type', 'application/json');

        xhr.onload = function () {
            if (xhr.status === 200) {
                const data = JSON.parse(xhr.responseText);
                
                console.log("Received data:", data);
                const userId = data.userId;
                const token = data.token;
                const isAdmin = data.isAdmin;

                localStorage.setItem("token", token);
                localStorage.setItem("username", username);
                console.log(data);
                Cookies.set("userID", userId, { expires: 7 });
                Cookies.set("username", username);
                Cookies.set("isAdmin", isAdmin);

                navigate('/');
            } else {
                setError("Login failed. Please check your Username and Password");
            }
        };

        xhr.onerror = function () {
            setError("Login failed. Please check your Username and Password");
        };

        xhr.send(JSON.stringify({ username, password }));
    };

    const handleClose = () => {
        navigate('/');
    };

    return (
        <div className="loginform">
            <button type="button" className="btn-close" aria-label="Close" onClick={handleClose}></button>
            <h2>Login</h2>
            
            <form onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label><br />
                <input
                    type="text"
                    id="username"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                /><br />

                <label htmlFor="password">Password</label><br />
                <input
                    type="password"
                    id="password"
                    placeholder="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                /><br />

                <button type="submit">Login</button><br />

                {<p>{error}</p>}

                <a href="/register"><p>Register Here</p></a>
            </form>
        </div>
    );
};

export default Login;
