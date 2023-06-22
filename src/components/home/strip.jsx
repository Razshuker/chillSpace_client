import React from 'react'
import '../../css/home.css'

export default function Strip() {
    return (
        <div className='strip'>
            <video className="video d-lg-block d-none" autoPlay loop muted>
                <source src={"images/strip.mp4"} type='video/mp4' />
            </video>
            <img src='' alt='cover-image' className="image d-lg-none d-block" />
        </div>
    )
}
