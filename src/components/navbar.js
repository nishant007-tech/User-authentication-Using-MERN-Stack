import React from 'react';
import { Link } from 'react-router-dom';
import logo from "../static/images/rana.jpg";
//{} in these parenthesis we can write js code
//${`process.env.PUBLIC_URL/images`} this will work as well.



function Nav() {
    const logoutHandler = (e) => {
        localStorage.removeItem('token');
    }

    let token = localStorage.getItem('token');
    if (token) {

        return (

            <div className="navBar">
                <ul>
                    <img src={logo} alt="Logo For Navbar" />
                    <Link to='/'>
                        <li> Home</li>
                    </Link>
                    <a href="/">
                        <li onClick={logoutHandler} >Logout</li>
                    </a>
                    <Link to="/profile">
                        <li>Profile</li>
                    </Link>
                </ul>

            </div >
        );
    }//end if
    else {

        return (

            <div className="navBar">
                <ul>
                    <img src={process.env.PUBLIC_URL + 'logo192.png'} alt="Logo For Navbar" />
                    <Link to='/'>
                        <li> Home</li>
                    </Link>
                    <Link to='/register'>
                        <li>Register</li>
                    </Link>
                    <Link to='/login'>
                        <li>Login</li>
                    </Link>
                </ul>

            </div>
        );
    }//end if

}

export default Nav;