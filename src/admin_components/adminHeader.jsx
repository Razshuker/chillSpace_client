import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService'
import { MyContext } from '../context/myContext';

export default function AdminHeader() {
    const nav = useNavigate();
    const [showNav, setShowNav] = useState(false);
    const { setUserInfo } = useContext(MyContext);

    useEffect(() => {
        if (localStorage[TOKEN_KEY]) {
            checkToken();
        }
    }, [localStorage[TOKEN_KEY]]);

    const checkToken = async () => {
        try {
            const url = API_URL + "/users/checkToken";
            const data = await doApiGet(url);
            if (data.role == "admin") {
                setShowNav(true);
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <header className='container-fluid'>
            <div className="row justify-content-between align-items-center py-1">
                <div className="col-5 logo"><img src='images/chillSpaceLogoPNG.png' alt='logo' /></div>
                {showNav &&
                    <div className="adminNav row col">
                        <nav className="col  d-flex align-items-center">
                            <ul className='list-inline d-flex m-0'>
                                <li><Link className='text-dark' to="/admin/users">USERS</Link></li>
                                <li><Link className='text-dark' to="/admin/places">PLACES</Link></li>
                                <li><Link className='text-dark' to="/admin/categories">CATEGORIES</Link></li>
                                <li><Link className='text-dark' to="/admin/types&tags">TAGS & TYPES</Link></li>
                                <li><Link className='text-dark' to="/admin/reportedPosts">REPORTED POSTS</Link></li>
                            </ul>
                        </nav>
                        <button onClick={() => {
                            localStorage.removeItem(TOKEN_KEY);
                            setUserInfo({});
                            setShowNav(false);
                            nav("/admin");
                        }} className='btn btn-danger col-2 me-4'>logout</button>
                    </div>
                }
            </div>
        </header >
    )
}
