import React from "react";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Signup() {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        let auth = localStorage.getItem('user')
        if (auth) {
            navigate('/')
        }
    })


    async function collectData() {
        let result = await fetch('http://localhost:5000/register', {
            method: 'POST',
            body: JSON.stringify({ name, email, password }),
            headers: {
                "Content-Type": "application/json"
            },
        });
        result = await result.json()
        console.log(result)
      
            localStorage.setItem("user", JSON.stringify(result.result))
            localStorage.setItem("token", JSON.stringify(result.auth))
           
                navigate('/');
        

    }


    return (
        <div className="signup">

            <h1>Register</h1>
            <br /><br />
            <div className="inputfield">
                <input type="text" placeholder=" Enter Name" value={name} onChange={(e) =>
                    setName(e.target.value)} />

                <input type="email" placeholder=" Enter Email" value={email} onChange={(e) =>
                    setEmail(e.target.value)} />

                <input type="password" placeholder=" Enter Password" value={password} onChange={(e) =>
                    setPassword(e.target.value)} />

                <button className="btn" onClick={collectData}>SignUp</button>
            </div>
        </div>
    );
}

export default Signup;