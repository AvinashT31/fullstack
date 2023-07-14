import React, { useState } from 'react'
import '../Styles/Login.css'
import axios from 'axios';

const Login = () => {

    const [loginData, setloginData] = useState({ email: "", password: "" });
    console.log(loginData, "loginData");

    const handlelogin = async (e) => {
        e.preventDefault();

        if (loginData.email && loginData.password) {
            const response = await axios.post("http://localhost:8000/login", {
                email: loginData.email,
                password: loginData.password
            })
            // console.log(response.data, "response")
            if (response.data.status === 200) {
                alert(response.data.message)
                setloginData({ email: "", password: "" });
            }
            else if (response.data.status === 400) {
                alert(response.data.message)
                setloginData({ email: "", password: "" });
            }
        }
        else {
            alert("please fill all field")
        }
    }

    const handleloginform = (e) => {
        var name = e.target.name;
        var value = e.target.value;
        setloginData({ ...loginData, [name]: value })
    }
    return (
        <>
            <div className='login-fullpage'>
                <div className='loginpage'>
                    <h1 className='loginheading'>Login</h1>
                    <form onClick={(e) => handlelogin(e)}>
                        <label>Enter Your Email</label>
                        <br />
                        <input onChange={(e) => handleloginform(e)} name='email' value={loginData.email} type="email" />
                        <br />
                        <label>Enter Your Password</label>
                        <br />
                        <input onChange={(e) => handleloginform(e)} name='password' value={loginData.password} type="password" />
                        <br />
                        <input className='btn' type="submit" value="Login" />
                    </form>

                </div>
            </div>
        </>
    )
}

export default Login