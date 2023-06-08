import React from 'react'
import { Link } from 'react-router-dom'

export default function Header() {
    return (
        <div className='container-fluid bg-info'>
            <div className="row justify-content-between align-items-center py-4">
                <div className="col logo">Logo</div>
                <div className="nav row col">
                    <nav className="col">
                        <ul className='list-inline d-flex align-items-center'>
                            <li className='me-3'><Link to="/admin/usersList">USERS</Link></li>
                            <li className='me-3'><Link to="/admin/places">PLACES</Link></li>
                        </ul>
                    </nav>
                    <button className='btn btn-danger col-2 me-4'>logout</button>
                </div>
            </div>
        </div >
    )
}
