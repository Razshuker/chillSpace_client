import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import '../App.css'
import ProfileMenu from './header/profileMenu'

export default function Header() {
    const nav = useNavigate();

    return (
        <header className='container-fluid'>
            <div className="row justify-content-between align-items-center px-4">
                <div className="col logo">
                    <img onClick={() => {
                        nav("/")
                    }} src='images/chillSpaceLogoPNG.png' alt='logo' />
                </div>
                <div className="nav row col align-items-center ">
                    <nav className="col d-flex justify-content-end">
                        <ul className='list-inline m-0 d-flex '>
                            <li><Link to="/posts">POSTS</Link></li>
                            <li><Link to="/places">PLACES</Link></li>
                        </ul>
                    </nav>
                    <div className='col-2'><ProfileMenu /></div>
                </div>
            </div>
        </header >
    )
}
