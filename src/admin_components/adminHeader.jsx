import React from 'react'
import '../css/header.css'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../services/apiService'

export default function AdminHeader() {
    const nav = useNavigate();
    return (
        <header className='container-fluid'>
            <div className="row justify-content-between align-items-center py-1">
                <div className="col-5 logo"><img src='images/chillSpaceLogoPNG.png' alt='logo' /></div>
                {localStorage[TOKEN_KEY] &&
                    <div className="adminNav row col">
                        <nav className="col  d-flex align-items-center">
                            <ul className='list-inline d-flex m-0'>
                                <li><Link className='text-dark' to="/admin/users">USERS</Link></li>
                                <li><Link className='text-dark' to="/admin/places">PLACES</Link></li>
                                <li><Link className='text-dark' to="/admin/categories">CATEGORIES</Link></li>
                                <li><Link className='text-dark' to="/admin/reportedPosts">REPORTED POSTS</Link></li>
                            </ul>
                        </nav>
                        <button onClick={() => {
                            localStorage.removeItem(TOKEN_KEY);
                            nav("/admin");
                        }} className='btn btn-danger col-2 me-4'>logout</button>
                    </div>
                }
            </div>
        </header >
    )
}
