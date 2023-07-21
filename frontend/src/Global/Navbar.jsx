import React from 'react'
import '../Styles/Navbar.css'

const Navbar = () => {
    return (
        <>
            <nav className='navbar'>
                <ul>
                    <li><a href="#">Logo</a></li>
                    <li><a href="#">user handler</a></li>
                    <li><a href="#">Product handler</a></li>
                    <li><a href="#">All Products</a></li>
                    <li><a href="#">Carts</a></li>
                    <li><a href="#">Account</a></li>
                    <li><a href="#">Logout</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
