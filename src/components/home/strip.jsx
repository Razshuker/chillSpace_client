import React from 'react'
import '../../css/home.css'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';

export default function Strip() {
    return (
        <div className='strip'>
            <div className='d-lg-block d-none'>
                <video className="video" autoPlay loop muted>
                    <source src={"images/strip.mp4"} type='video/mp4' />
                </video>
                <div className="context h-100">
                    <KeyboardArrowDown className='down' fontSize='large' />
                </div>
            </div>
            <div className="image d-lg-none d-block">
                <img src='' alt='cover-image' />
            </div>
        </div>
    )
}
