import React, { useState } from 'react'
import '../Styles/Register.css'
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

const Register = () => {

    const [userRegister, setuserRegister] = useState({ name: "", email: "", number: "", password: "" });
    // console.log(userRegister, "userRegister");

    const [role, setrole] = useState("Admin");
    // console.log(role, "role")

    const route = useNavigate();

    const handlesubmit = async (e) => {
        e.preventDefault()

        if (userRegister.name && userRegister.email && userRegister.number && userRegister.password) {
            const response = await axios.post("http://localhost:8000/register", {
                name: userRegister.name,
                email: userRegister.email,
                number: userRegister.number,
                password: userRegister.password,
                role: role
            })
            console.log(response, "response");
            if (response.data.status === 200) {
                route('/login');
                alert(response.data.message)
            }
            else if (response.data.status === 400) {
                alert(response.data.message)
            }
        }
        else {
            alert("please fill all field");
        }
    }

    const handleform = (e) => {
        // console.log(e.target);
        var name = e.target.name;
        var value = e.target.value;
        setuserRegister({ ...userRegister, [name]: value })
    }

    const onselectrole = (event) => {
        // console.log(event.target.value, "role")
        setrole(event.target.value);
    }

    return (
        <>
            <div className='reigster-fullpage'>
                <div className='registerpage'>
                    <h1 className='registerheading'>Register</h1>
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <label>Enter Your Name</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='name' value={userRegister.name} type="text" />
                        <br />
                        <label>Enter Your Email</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='email' value={userRegister.email} type="email" />
                        <br />
                        <label>Select Your Role</label>
                        <br />
                        <select onChange={onselectrole} style={{ marginTop: "3%", width: "70%", height: "5vh", marginBottom: "2%" }}>
                            <option value="Admin">Admin</option>
                            <option value="SuperAdmin">SuperAdmin</option>
                            <option value="Seller">Seller</option>
                            <option value="Buyer">Buyer</option>
                        </select>
                        <br />
                        <label>Enter Your Number</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='number' value={userRegister.number} type="number" />
                        <br />
                        <label>Enter Your Password</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='password' value={userRegister.password} type="password" />
                        <br />
                        <input className='btn' type="submit" value="Register" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Register
