import React, { useState, useEffect } from 'react';
import '../App.css';

function Home() {
    const [userData, setuserData] = useState([]);
    const token = localStorage.getItem('token');
    useEffect(() => {
        async function fetchUsers() {
            const fullResponse = await fetch('http://localhost:5000/api/user/');
            const responseJson = await fullResponse.json();
            setuserData(responseJson.users);
        }

        fetchUsers();
    }, []);
    if (token) {

        return (
            <div>
                <h2>List Of All Users That Are Registered.</h2>
                <ul>
                    {userData.map((user) => (
                        <li key={user._id}>
                            <h3>
                                {user.name}
                            </h3>
                            <p>{user.email}</p>
                            <pre>User Created At :{user.date}</pre>
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
    else {
        return (
            <h1> You Are Not Authorized Yet To Access This Page</h1 >
        );
    }

}
export default Home;