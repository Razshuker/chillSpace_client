import React from 'react'
import { Link } from 'react-router-dom'

export default function AdminHeader() {
    return (
        <div className='container-fluid bg-secondary'>
            <div className="row justify-content-between align-items-center py-4">
                <div className="col logo">Logo</div>
                <div className="nav row col">
                    <nav className="col">
                        <ul className='list-inline d-flex align-items-center'>
                            <li className='me-3'><Link className='text-dark' to="/admin/users">USERS</Link></li>
                            <li className='me-3'><Link className='text-dark' to="/admin/places">PLACES</Link></li>
                            <li className='me-3'><Link className='text-dark' to="/admin/categories">CATEGORIES</Link></li>
                        </ul>
                    </nav>
                    <button className='btn btn-danger col-2 me-4'>logout</button>
                </div>
            </div>
        </div >
    )
}
