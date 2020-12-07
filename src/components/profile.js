import React, { useState, useEffect } from 'react';
import '../profile.css';
import img from '../static/images/rana.jpg';
import Avatar from 'react-avatar';
import axios from 'axios';

function Profile() {
    const [userdata, setuser] = useState({
        users: []
    });

    useEffect(() => {
        async function fetchUser() {
            try {
                let token = JSON.parse(localStorage.getItem('token'));
                const response = await axios.get('http://localhost:5000/api/user/profile',
                    { headers: { "x-auth-token": token } }
                );
                setuser({
                    users: [response.data.user]
                });
            } catch (err) {
                console.log(err.data);
            }

        }
        fetchUser();
    }, []);

    return (
        <div className="container2">
            <div className="content2" >
                <h2>User Profile</h2>
                <div className="userImage">
                    <Avatar
                        src={img}
                        width={55}
                        height={55}
                        round={true}
                    />
                </div>
                <form>
                    {userdata.users.map((data) => (
                        <div key={data}>
                            <h1>{data.name}</h1>
                            <b>{data.email}</b>
                            <p>{data.date}</p>
                        </div>
                    ))
                    }
                </form>
            </div>
        </div>
    );
}

export default Profile;