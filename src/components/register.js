import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

function Register() {
    const [state, setState] = useState({
        name: "",
        email: "",
        password: ""
    });
    const [error, setError] = useState();

    const nameHandler = (e) => {
        setState({
            ...state, name: e.target.value
        })
    }
    const emailHandler = (e) => {
        setState({
            ...state, email: e.target.value
        })
    };
    const passwordHandler = (e) => {
        setState({
            ...state, password: e.target.value
        })
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/user/register', state)
            console.log(response);
            window.location = '/login';
        } catch (err) {
            if (err.response && err.response.data) {
                // console.log(err.response.data.message) // some reason error message
                setError(err.response.data.message);
            }
        }
    }
    const closeButtonhandler = () => {
        setError(undefined);
    }
    return (
        <div>
            <form onSubmit={(e) => submitHandler(e)} >
                <div className="container">
                    <h1>Register</h1>
                    <p>Please fill in this form to create an account.</p>
                    <hr></hr>
                    {error && (
                        <div className="error-msg">
                            <span>{error}</span>
                            <button onClick={closeButtonhandler}>X</button>
                        </div>)
                    }
                    <label ><b>Name</b></label>
                    <input onChange={(e) => nameHandler(e)} type="text" placeholder="Enter Name" id="email" required></input>

                    <label ><b>Email</b></label>
                    <input onChange={(e) => emailHandler(e)} type="email" placeholder="Enter Email" name="psw" id="psw" required></input>

                    <label><b>Password</b></label>
                    <input onChange={(e) => passwordHandler(e)} type="password" placeholder="Password" name="psw-repeat" id="psw-repeat" required></input>
                    <hr></hr>
                    <p>By creating an account you agree to our <a href='/' >Terms & Privacy</a>.</p>

                    <button type="submit" className="registerbtn">Register</button>
                </div>

                <div className="container signin">
                    <p>Already have an account? <Link to='/login'>Sign in</Link>.</p>
                </div>
            </form>
        </div >
    );

}

export default Register;