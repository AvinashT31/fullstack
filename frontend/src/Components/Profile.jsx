import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Profile.css'
import { AuthContext } from '../Context/User.context'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Profile = () => {

    const { state, login } = useContext(AuthContext);
    console.log(state, "state");

    const [updateData, setupdateData] = useState({});
    console.log(updateData, "updateData");

    const route = useNavigate();

    const handleform = (e) => {
        setupdateData({ ...updateData, [e.target.name]: e.target.value })
    }

    const handlesubmit = async (e) => {
        e.preventDefault();
        if (updateData.name && updateData.email && updateData.number && updateData.password && updateData._id) {
            // console.log(updateData._id);
            const res = await axios.post("http://localhost:8000/updated-profile", {
                // updateData
                name: updateData.name,
                email: updateData.email,
                number: updateData.number,
                password: updateData.password,
                _id: updateData._id
            })
            login({ payload: res.data })
            setupdateData(res.data)
            // console.log(res.data, "check")
            alert("Data updated successfully");
        }
        else {
            return alert("please fill all field")
        }
    }

    useEffect(() => {
        if (state?.user?._id) {
            async function getData() {
                const result = await axios.post("http://localhost:8000/get-current-user-with-pass", {
                    userId: state?.user?._id
                })
                // console.log(result.data, "result");
                setupdateData(result.data.data);
            }
            getData()
        }
        else{
            route('/login')
        }

    }, [state])


    return (
        <>
            <div className='profile-fullpage'>
                <div className='profilepage'>
                    <h1 className='profileheading'>Update profile</h1>
                    <form onSubmit={(e) => handlesubmit(e)}>
                        <label>Enter Your Name</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='name' value={updateData.name} type="text" />
                        <br />
                        <label>Enter Your Email</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='email' value={updateData.email} type="email" />
                        <br />
                        <label>Enter Your Number</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='number' value={updateData.number} type="number" />
                        <br />
                        <label>Enter Your Password</label>
                        <br />
                        <input onChange={(e) => handleform(e)} name='password' value={updateData.password} type="password" />
                        <br />
                        <input className='btn' type="submit" value="Update" />
                    </form>
                </div>
            </div>
        </>
    )
}

export default Profile
