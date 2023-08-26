import React, { useContext, useEffect, useState } from 'react'
import '../App.css'
import { Link, useNavigate } from 'react-router-dom'
import { API_URL, TOKEN_KEY, doApiGet } from '../services/apiService'
import { CiMenuBurger } from "react-icons/ci";
import { TfiClose } from "react-icons/tfi";
import { MyContext } from '../context/myContext';

export default function AdminHeader() {
    const nav = useNavigate();
    const [showNav, setShowNav] = useState(false);
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
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

    const onToggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }

    return (
        <header className='container-fluid'>
            <div style={{maxWidth:1100}} className='container'>
                <div className="row justify-content-between align-items-center py-1">
                    <div onClick={() => {
                        nav("/")
                    }} className="col-auto logo"><img src='images/chillSpaceLogoPNG.png' alt='logo' /></div>
                    {showNav &&
                        <div className="adminNav row col-auto">
                            <nav className={isBurgerOpen ? "burgerShow col-auto justify-content-center pt-5" : "d-lg-flex align-items-center col-auto"}>
                                <TfiClose onClick={onToggleBurger} className={isBurgerOpen ? "d-lg-flex closeIcon" : "d-none"} />
                                <ul className='list-inline d-lg-flex m-0 col-12 col-lg-auto'>
                                    <li><Link className='text-dark' to="/admin/users">USERS</Link></li>
                                    <li><Link className='text-dark' to="/admin/places">PLACES</Link></li>
                                    <li><Link className='text-dark' to="/admin/categories">CATEGORIES</Link></li>
                                    <li><Link className='text-dark' to="/admin/types&tags">TAGS & TYPES</Link></li>
                                    <li><Link className='text-dark' to="/admin/reportedPosts">REPORTED POSTS</Link></li>
                                </ul>
                                <button onClick={() => {
                                    localStorage.removeItem(TOKEN_KEY);
                                    setUserInfo({});
                                    setShowNav(false);
                                    nav("/admin");
                                }} className='adminLogout_btn btn btn-danger col-auto me-4'>logout</button>
                            </nav>
                            <CiMenuBurger onClick={onToggleBurger} className={isBurgerOpen ? 'd-none' : 'd-lg-none burger p-0 me-4'} />
                        </div>
                    }
                </div>
            </div>
        </header >
    )
}
