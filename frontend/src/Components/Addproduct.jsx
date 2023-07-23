import React, { useContext, useEffect, useState } from 'react'
import axios from 'axios';
import '../Styles/Addproduct.css';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../Context/User.context';

const Addproduct = () => {

  const { state } = useContext(AuthContext);
  // console.log(state.user, "state");

  const [user, setuser] = useState("");
  console.log(user, "user")

  useEffect(() => {
    if (state.user) {
      setuser(state?.user)
    }
    else {
      setuser("");
    }
  }, [state])

  useEffect(() => {
    if(state?.user){
      if(state?.user?.role != "Seller"){
        alert("you are not a seller");
        route("/");
      }
    }
  }, [state])

  const [addproduct, setaddproduct] = useState({ name: "", image: "", price: "" });
  console.log(addproduct, "addproduct");

  const route = useNavigate();

  const handleclick = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    setaddproduct({ ...addproduct, [name]: value })
  }

  const handlesubmit = async (e) => {
    e.preventDefault()

    if (addproduct.name && addproduct.image && addproduct.price) {
      const response = await axios.post("http://localhost:8000/addproduct", {
        name: addproduct.name,
        image: addproduct.image,
        price: addproduct.price,
        userId: user._id
      })
      if (response.data.status === 200) {
        route("/showproduct");
        alert(response.data.message);
      }
    } else {
      alert("please fill all fields")
    }
  }

  return (
    <div>
      <div className='addproduct-fullpage'>
        <div className='addproductpage'>
          <h1 className='addproductheading'>Seller Panel</h1>
          <form onSubmit={handlesubmit}>
            <label style={{ marginLeft: "40px" }}>Enter Your Product Name</label>
            <br />
            <input onChange={handleclick} name='name' value={addproduct.name} type="text" />
            <br />
            <label style={{ marginLeft: "80px" }}>Enter Your Product image_URL</label>
            <br />
            <input onChange={handleclick} name='image' value={addproduct.image} type="text" />
            <br />
            <label>Enter Your Price</label>
            <br />
            <input onChange={handleclick} name='price' value={addproduct.price} type="number" />
            <br />
            <input className='btn' type="submit" value="Add the products" />
          </form>
        </div>
      </div>
    </div>
  )
}

export default Addproduct;
