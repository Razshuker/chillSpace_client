import React from 'react'
import { Link } from 'react-router-dom'
import '../css/header.css'
import ProfileMenu from './header/profileMenu'

export default function Header() {
    return (
        <header className='container-fluid'>
            <div className="row justify-content-between align-items-center px-4">
                <div className="col logo">
                    <img src='images/chillSpaceLogoPNG.png' alt='logo'></img>
                </div>
                <div className="nav row col">
                    <nav className="col">
                        <ul className='list-inline d-flex align-items-center'>
                            <li className='me-3'><Link to="/admin/usersList">USERS</Link></li>
                            <li className='me-3'><Link to="/admin/places">PLACES</Link></li>
                        </ul>
                    </nav>
                    <button className='btn btn-danger col-2 me-4'><ProfileMenu /></button>
                </div>
            </div>
        </header >
    )
}
