import React, { useEffect } from "react";

import { useState } from 'react';

import { useNavigate } from 'react-router-dom';

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }

    }, [])

    async function Loginfunc() {
        let result = await fetch('http://localhost:5000/login',
            {
                method: "POST",
                body: JSON.stringify({ email, password }),
                headers: {
                    "Content-Type": "application/json"
                }
            });
        result = await result.json();
        console.log(result);
        if (result.auth) {
            localStorage.setItem('user', JSON.stringify(result.user));
            localStorage.setItem('token', JSON.stringify(result.auth));
            navigate('/');
        }
        else {
            alert("Please enter correct email or password");
        }
    }

    return (
        <div className="login">
            <h1>Login</h1>
            <br /><br />
            <div className="inputfield">
                <input type="text" placeholder="Enter Email" value={email} onChange={(e) =>
                    setEmail(e.target.value)} />
                <input type="password" placeholder="Enter Password" value={password} onChange={(e) =>
                    setPassword(e.target.value)} />
                <button className="btn" onClick={Loginfunc} >Login</button>
            </div>
        </div>
    );
}
export default Login;