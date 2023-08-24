import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import ProfileMenu from './header/profileMenu'
import { CiMenuBurger } from "react-icons/ci";
import { useContext } from 'react';
import { MyContext } from '../context/myContext';
import { AccountCircle } from '@mui/icons-material';
import { TfiClose } from "react-icons/tfi";
import Login from './login';
import { TOKEN_KEY } from '../services/apiService';
import UserInfo from './user/userInfo';
import { toast } from 'react-toastify';


export default function Header() {
    const [isBurgerOpen, setIsBurgerOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);
    const { userInfo, setUserInfo } = useContext(MyContext);

    const nav = useNavigate();

    const onToggleBurger = () => {
        setIsBurgerOpen(!isBurgerOpen);
        setIsProfileOpen(false);
    }
    const onToggleProfile = () => {
        if (localStorage[TOKEN_KEY]) {
            setIsProfileOpen(!isProfileOpen);
        }
    }

    return (
        <header className='container-fluid'>
            <div className='container'>
                <div className=" d-flex justify-content-between align-items-center">
                    <div className="col-auto logo">
                        <img onClick={() => {
                            nav("/")
                        }} src='images/chillSpaceLogoPNG.png' alt='logo' />
                    </div>
                    <div className='row'>
                        <div className={isBurgerOpen ? "col-0" : "row col-auto align-items-center justify-content-end p-0"}>
                            <nav className={isBurgerOpen ? "burgerShow d-lg-flex nav " : "nav d-lg-flex justify-content-end"}>
                                <TfiClose role='button' onClick={onToggleBurger} className={isBurgerOpen ? "d-lg-flex closeIcon" : "d-none"} />
                                <ul className='list-inline m-0 d-lg-flex '>
                                    {isBurgerOpen ?
                                        <div  className='d-lg-none profile-li'>
                                            <span role='button' >
                                            {localStorage[TOKEN_KEY] && userInfo.img_url ? <img onClick={onToggleProfile} src={userInfo.img_url} alt='profile' className='profile-img my-5' /> :
                                                <AccountCircle onClick={onToggleProfile} className='profile_btn my-5' fontSize='large' />
                                            }
                                            </span>
                                            {localStorage[TOKEN_KEY] &&
                                                <div className={isProfileOpen ? 'responsive-profile d-flex align-items-center' : 'burger-profile'}>
                                                    <hr />
                                                    <ul className={isProfileOpen ? 'd-block p-0 m-0 list-inline' : 'd-none'}>
                                                        <li><Link to="/user/favorites">FAVORITES</Link></li>
                                                        <li><Link to="/user/posts">MY POSTS</Link></li>
                                                        <li><Link to="/user/updateAccount">UPDATE ACCOUNT DETAILS</Link></li>
                                                    </ul>
                                                    <hr />
                                                </div>
                                            }
                                        </div> : <></>
                                    }
                                    <li className='about-us-li'><Link to="/about-us">ABOUT US</Link></li>
                                    <li><Link to="/places">PLACES</Link></li>
                                    <li><Link to="/posts">POSTS</Link></li>
                                </ul>
                                <div className="d-flex d-lg-none pb-5">
                                    {!localStorage[TOKEN_KEY] ?
                                        <div className=' d-flex justify-content-end mb-3 flex-column'>
                                            <Link onClick={onToggleBurger} to='/login' className='btn btn-outline-dark d-block d-lg-none'>Login</Link>
                                            <Link onClick={onToggleBurger} to='/sign-up' className='d-block d-lg-none text-dark pt-2'>Don't have an account?</Link>
                                        </div> : <div className=' d-flex align-items-end mb-3'>
                                            <button onClick={() => {
                                                localStorage.removeItem(TOKEN_KEY);
                                                toast.success("you logged out");
                                                setUserInfo({});
                                                nav("/");
                                                onToggleBurger();
                                            }} className='btn btn-outline-dark'>Logout</button>
                                        </div>}
                                </div>
                            </nav>
                        </div>
                        <div className='col-2 d-none d-lg-block'><ProfileMenu /></div>
                    </div>
                    <div className="col-auto d-flex justify-content-end align-items-center d-lg-none">
                        <CiMenuBurger role='button' onClick={onToggleBurger} className={isBurgerOpen ? 'd-none' : 'burger p-0'} />
                    </div>
                </div>
            </div>
        </header >
    )
}
