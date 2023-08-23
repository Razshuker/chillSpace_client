import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { AiFillLinkedin } from 'react-icons/ai'

export default function Footer() {
    return (
        <footer className='container-fluid '>
            <div className='container'>
                <div className='row justify-content-center text-center align-items-center pt-4'>
                    <div className='col-lg-4 col-12 '>
                        <ul className='list-inline m-0 '>
                            <li className='about-us-li'><Link to="/about-us">ABOUT US</Link></li>
                            <li><Link to="/">HOME</Link></li>
                            <li><Link to="/places">PLACES</Link></li>
                            <li><Link to="/posts">POSTS</Link></li>
                        </ul>
                    </div>
                    <div className='col-lg-4 col-12'>
                        <div className=' row justify-content-center text-center align-items-center'>
                            <h4>R&N</h4>
                            <p>Chill Space</p>
                        </div>
                    </div>
                    <div className='col-lg-4 col-12'>
                        <div className=''>
                            <div>
                                <span>Noy Nosrati</span>
                                <AiFillLinkedin/>
                            </div>
                            <div>
                                <span>Raz Shuker</span>
                                <AiFillLinkedin/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
