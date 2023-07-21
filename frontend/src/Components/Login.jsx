import React, { useState} from 'react'
import '../Styles/Login.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../Context/User.context';

const Login = () => {

    const [loginData, setloginData] = useState({ email: "", password: "" });
    console.log(loginData, "loginData");

    const route = useNavigate();

    const {state, login, logout} = useContext(AuthContext);
    console.log(state, "state in login");

    const handlelogin = async (e) => {
        e.preventDefault();

        if (loginData.email && loginData.password) {
            const response = await axios.post("http://localhost:8000/login", {
                email: loginData.email,
                password: loginData.password
            })
            // console.log(response.data, "response")
            if (response.data.status === 200) {
                console.log(response.data.data);

                localStorage.setItem("access-token", JSON.stringify(response.data.data))
                login({ token: response.data.data, payload: response.data.user })
                alert(response.data.message)
                setloginData({ email: "", password: "" });
                // route('/addproduct')
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
