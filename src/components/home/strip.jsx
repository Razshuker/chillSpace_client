import React from 'react';
import { BsSun } from "react-icons/bs";
import '../../css/home.css';

export default function Strip() {
    return (
        <div className='strip'>
            <div className="video-container">
                <video className="video d-lg-block d-none" autoPlay loop muted>
                    <source src={"images/strip.mp4"} type='video/mp4' />
                </video>
            </div>
            <div className='image d-lg-none d-block'></div>
            <div className="text-overlay bg-transparent ">
                <div className='row pt-5 mt-2'>
                <h1 style={{fontSize:"4em"}}>Your place</h1>
                <h2 className='pt-2'> <span  style={{fontSize:"2.2em"}}>To find your chill</span>  <BsSun className='sunIcon mb-3' />
</h2>
                </div>
            </div>
        </div>
    );
}
