import React, { useContext, useEffect, useState } from 'react'
import '../Styles/Navbar.css'
import { AuthContext } from '../Context/User.context'
import { useNavigate } from 'react-router-dom';

const Navbar = () => {

    const [user, setuser] = useState({});
    console.log(user, "user")

    const route = useNavigate();

    const [userrole, setuserrole] = useState("");
    console.log(userrole, "userrole");

    const { state, logout } = useContext(AuthContext);
    // console.log(state, "state");

    useEffect(() => {
        if (state.user) {
            setuser(state?.user)
            setuserrole(state?.user?.role);
        }
        else {
            setuser({})
            setuserrole("");
        }
    }, [state])
    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li><a>Home</a></li>

                    {(userrole == "Admin" || userrole == "Seller") && <div>
                        <li><a>user handler</a></li>
                    </div>}

                    {(userrole == "Admin" || userrole == "Seller") && <div>
                        <li onClick={() => route('/producthandler')}><a>Product handler</a></li>
                    </div>}

                    {(userrole == "Admin" || userrole == "Seller") && <div>
                        <li onClick={() => route('/addproduct')}><a>Add products</a></li>
                    </div>}

                    <li onClick={() => route('/showproduct')}><a>All Products</a></li>

                    {(userrole == "Buyer") && <div>
                        <li><a>Carts</a></li>
                    </div>}

                    {user?.name ? <div>
                        <li><a>{user.name}</a></li>
                        <li onClick={logout}><a href="#">Logout</a></li>
                    </div> : <div>
                        <li onClick={() => route('/login')}><a>Login</a></li>
                    </div>}

                </ul>
            </nav>
        </>
    )
}

export default Navbar
