import React, { useState, useContext } from 'react';
import axios from 'axios';
import { myContext } from './contextApiForUserLoggedIn';
function Login() {
    const [, setUser] = useContext(myContext);
    const [error, setError] = useState();
    const [state, setState] = useState({
        email: '',
        password: ''
    });

    const emailHandler = (e) => {
        setState({
            ...state, email: e.target.value
        });
    };

    const passwordHandler = (e) => {
        setState({
            ...state, password: e.target.value
        })
    };
    const submitHandler = async (e) => {
        e.preventDefault();
        try {
            const data = await axios.post('http://localhost:5000/api/user/login', state);
            localStorage.setItem('token', JSON.stringify(data.data.token));
            setUser({
                user: data.data.user
            })
            window.location = '/profile';

        } catch (err) {
            setError(err.response.data.message);
        }
    };
    const closeButtonhandler = () => {
        setError(undefined);
    };

    return (
        <div>
            <h2>Login Here!</h2>
            <form onSubmit={submitHandler} className="modal-content animate" method="post">


                <div className="container">
                    {error && (
                        <div className="error-msg">
                            <span>{error}</span>
                            <button onClick={closeButtonhandler}>X</button>
                        </div>)
                    }
                    <label ><b>Email</b></label>
                    <input onChange={emailHandler} type="text" placeholder="Enter Email" name="uname" required></input>

                    <label><b>Password</b></label>
                    <input onChange={passwordHandler} type="password" placeholder="Enter Password" name="psw" required></input>

                    <button id='login' type="submit">Login</button>

                </div>
            </form>
        </div>
    );
}
export default Login;