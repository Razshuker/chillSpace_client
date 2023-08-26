import React from 'react'
import '../App.css'
import { Link } from 'react-router-dom'
import { AiFillGithub, AiFillLinkedin } from 'react-icons/ai'

export default function Footer() {
    return (
        <footer className='container-fluid m-0'>
            <div className='container m-0'>
                <div className='row justify-content-center text-center align-items-center pt-4 pb-3 m-0'>
                    <div className='col-lg-4 col-12 col-md-6  '>
                        <ul className='list-inline mx-auto col-9 row  '>
                            <li className='col-6'><Link to="/about-us">ABOUT US</Link></li>
                            <li className='col-6'><Link to="/">HOME</Link></li>
                            <li className='col-6'><Link to="/places">PLACES</Link></li>
                            <li className='col-6'><Link to="/posts">POSTS</Link></li>
                        </ul>
                    </div>
                    <div className='col-lg-4 col-12 col-md-6 '>
                        <div className=' row justify-content-center text-center align-items-center m-0'>
                            <h4 className='p-0 m-0'>R&N</h4>
                            <div className="col-auto">
                        <img className='img-fluid' style={{height:45}} src='images/chillSpaceLogoPNG.png' alt='logo' />
                    </div>
                        </div>
                    </div>
                    <div className=' col-lg-4 col-12 pt-md-2 pt-2'>
                        <div className='row justify-content-around'>
                            <div className='col-6'>
                                <div className='pb-3'>Noy Nosrati</div>
                                <Link to="https://www.linkedin.com/in/noy-nosrati" className='text-dark' target="_blank"><AiFillLinkedin className='iconFooter h4 mx-1'/></Link>
                                <Link to="https://github.com/noyNosrati/" className='text-dark'  target="_blank">
                                <AiFillGithub className='h4 mx-1 iconFooter'/>
                                </Link>
                            </div>
                            <div className='col-6 '>
                                <div className='pb-3'>Raz Shuker</div>
                                <Link to="https://www.linkedin.com/in/raz-shuker/" className='text-dark' target="_blank"><AiFillLinkedin className='h4 mx-1 iconFooter'/></Link>
                                <Link to="https://github.com/Razshuker/" className='text-dark'  target="_blank">
                                <AiFillGithub className='h4 mx-1 iconFooter'/>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
