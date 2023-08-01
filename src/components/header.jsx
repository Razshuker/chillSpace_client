import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import ProfileMenu from './header/profileMenu'
import { CiMenuBurger } from "react-icons/ci";
import { useContext } from 'react';
import { MyContext } from '../context/myContext';
import { AccountCircle } from '@mui/icons-material';
import Login from './login';


export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { userInfo } = useContext(MyContext);

    const nav = useNavigate();

    const onToggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
    }
    const onToggleProfile = () => {
        setIsProfileOpen(!isProfileOpen);
    }

    return (
        <header className='container-fluid'>
            <div className='container'>
                <div className=" d-flex justify-content-between align-items-center border">
                    <div className="col-auto logo border">
                        <img onClick={() => {
                            nav("/")
                        }} src='images/chillSpaceLogoPNG.png' alt='logo' />
                    </div>
                    <div className='row'>
                        <div className={isBurgerOpen ? "col-0" : "row col-auto align-items-center "}>
                            <nav className={isBurgerOpen ? "burgerShow d-lg-flex nav border " : "nav d-lg-flex justify-content-end border"}>
                                <ul className='list-inline m-0 d-lg-flex '>
                                    {isBurgerOpen ?
                                        <li className='d-lg-none'>
                                            {userInfo.img_url ? <img src={userInfo.img_url} alt='profile' className='profile-img' /> : 
                                             <AccountCircle className='profile_btn' fontSize='large' />
                                            // <Link to='/login'>Login</Link>
                                          
                                            }

                                        </li> : <></>
                                    }
                                    <li><Link to="/posts">POSTS</Link></li>
                                    <li><Link to="/places">PLACES</Link></li>

                                </ul>
                            </nav>
                        </div>
                        <div className='col-2 border d-none d-lg-block'><ProfileMenu /></div>
                    </div>
                    <div className="col-auto d-flex justify-content-end align-items-center d-lg-none border">
                        <CiMenuBurger onClick={onToggleBurger} className='burger p-0' />
                    </div>
                </div>
            </div>
        </header >
    )
}
