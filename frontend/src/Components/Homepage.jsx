import React, { useEffect, useState } from 'react'
import { useContext } from 'react';
import { AuthContext } from '../Context/User.context';

const Homepage = () => {

  const [User, setUser] = useState({})
  // console.log(User, "User");
  
  const { state } = useContext(AuthContext);
  // console.log(state, "state");

  useEffect(() => {

    console.log(state.user, "-check");
    if (state?.user?.name) {
      setUser(state?.user)
    }
    else {
      setUser({});
    }
  }, [state])


  return (
    <>

      <div>
        <p>Name: {User?.name}</p>
      </div>
    </>
  )
}

export default Homepage