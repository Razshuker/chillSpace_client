import React from 'react'
import { Link } from 'react-router-dom'

export default function Page404() {
    return (
        <div style={{ backgroundImage: `url("https://images.pexels.com/photos/1834403/pexels-photo-1834403.jpeg?auto=compress&cs=tinysrgb&w=1600")` }} className='page404 '>
            <h2 className='col-12'>404</h2>
            <h3 className='col-12'>The page you are looking for doesn't exist!</h3>
            <Link to={"/"} className='back-btn'>back to HomePage</Link>
        </div>
    )
}
