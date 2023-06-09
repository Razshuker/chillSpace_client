import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { TOKEN_KEY } from '../services/apiService'

export default function AdminHeader() {
    const nav = useNavigate();
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
                    {localStorage[TOKEN_KEY] &&
                        <button onClick={() => {
                            localStorage.removeItem(TOKEN_KEY);
                            nav("/admin");
                        }} className='btn btn-danger col-2 me-4'>logout</button>
                    }
                </div>
            </div>
        </div >
    )
}
