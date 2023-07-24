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
            <div className="text-overlay">
                <BsSun className='sunIcon' />
                <h2>YOUR PLACE</h2>
                <h3>TO FIND YOUR CHILL</h3>
            </div>
        </div>
    );
}
