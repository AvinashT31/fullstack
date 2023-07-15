import React, { useEffect, useState } from 'react'
import '../Styles/Homepage.css';
import axios from 'axios';

const Homepage = () => {

  const [displayproduct, setdisplayproduct] = useState([]);
  console.log(displayproduct, "displayproduct");

  useEffect(() => {
    async function displayData() {
      const response = await axios.get("http://localhost:8000/homepage");
      // console.log(response.data, "data");
      setdisplayproduct(response.data);
    }
    displayData()
  }, [])
  return (
    <>
      <div className='homepage'>
        {displayproduct && displayproduct.map((e) => (
          <div className='homediv'>
            <div className='homedivimg'>
              <img src={e.image} alt="" />
            </div>
            <div className='homedivname'>
              <h1>{e.name}</h1>
            </div>
            <div className='homedivprice'>
              <h1>₹{e.price}</h1>
            </div>
          </div>
        ))}
      </div>
    </>
  )
}

export default Homepage