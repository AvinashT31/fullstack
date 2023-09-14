import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../Context/User.context'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Producthandler = () => {

  const { state } = useContext(AuthContext)
  console.log(state.user, "state");

  const [user, setuser] = useState({ name: "", image: "", price: "" });
  console.log(user, "user");

  const [getallproduct, setgetallproduct] = useState([]);
  console.log(getallproduct, "getallproduct")

  const route = useNavigate();

  useEffect(() => {
    if (state.user) {
      setuser(state?.user)
    } else {
      setuser({});
      setgetallproduct([]);
    }
  }, [state])

  useEffect(() => {
    async function getproduct() {
      const { data } = await axios.post("http://localhost:8000/get-all-particular-seller-product", {
        userId: user?._id
      })
      setgetallproduct(data)
    }
    if (user?._id) {
      getproduct()
    }
  }, [user])
  return (
    <>
      <div className='homepage'>
        {getallproduct && getallproduct.map((e) => (
          <div className='homediv'>
            <div className='homedivimg'>
              <img src={e.image} alt="" />
            </div>
            <div className='homedivname'>
              <h1>{e.name}</h1>
            </div>
            <div className='homedivprice'>
              <h1>₹{e.price}</h1>
              <button onClick={() => route(`/updateproduct/${e._id}`)}>Update Poduct</button>
            </div>
          </div>
        ))}
      </div>

    </>
  )
}

export default Producthandler
