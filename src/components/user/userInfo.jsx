import React, { useContext, useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet } from '../../services/apiService'
import { Link, useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext';

export default function UserInfo({ handleClose }) {
    const nav = useNavigate();
    const { userInfo, setUserInfo } = useContext(MyContext)


    return (
        <div style={{
            backgroundImage: `url("/images/loginBG.jpg")`
        }} className='userInfo container text-center pt-5' >
            {userInfo.full_name &&
                <React.Fragment>
                    <h3>Welcome {userInfo.full_name}!</h3>
                    <p className='text-center'>{userInfo.nickname}</p>
                    <div className="d-flex align-items-center justify-content-center list">
                        <ul onClick={handleClose} className='p-0 list-inline'>
                            <li><Link to="/user/favorites">FAVORITES</Link></li>
                            <li><Link to="#">MY POSTS</Link></li>
                            <li><Link to="/user/updateAccount">UPDATE ACCOUNT DETAILS</Link></li>
                        </ul>
                    </div>
                    <button onClick={() => {
                        localStorage.removeItem(TOKEN_KEY);
                        setUserInfo({});
                        handleClose();
                        alert("you logged out");
                        nav("/");
                    }} className='btn'>Logout</button>
                </React.Fragment>
            }
        </div>
    )
}
