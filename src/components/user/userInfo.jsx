import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom';

export default function UserInfo() {
    const nav = useNavigate();
    const [user, setUser] = useState({});

    useEffect(() => {
        doApi();
    }, []);

    const doApi = async () => {
        const url = API_URL + "/users/userInfo";
        const data = await doApiGet(url);
        setUser(data);
    }

    return (
        <div style={{
            backgroundImage: `url("/images/loginBG.jpg")`
        }} className='userInfo container text-center pt-5' >
            <h3>Welcome {user.full_name}!</h3>
            <p className='text-center'>{user.nickname}</p>
            <div className="d-flex align-items-center justify-content-center list">
                <ul className='p-0 list-inline'>
                    <li><Link to="#">FAVORITES</Link></li>
                    <li><Link to="#">MY POSTS</Link></li>
                    <li><Link to="/user/updateAccount">UPDATE ACCOUNT DETAILS</Link></li>
                </ul>
            </div>
            <button onClick={() => {
                localStorage.removeItem(TOKEN_KEY);
                alert("you logged out");
                nav("/");
            }} className='btn'>Logout</button>
        </div>
    )
}
