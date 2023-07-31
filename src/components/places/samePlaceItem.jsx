import React from 'react'
import '../../css/places.css'


export default function SamePlaceItem() {
    const img_url = "/images/categoryDefault.jpg";
    // const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div className="col-md-3 col-6">
            <div style={{ backgroundImage: `url(${img_url})` }} className="samePlaces">
                <a href={`/places/`}>
                    <div className='place-name'>
                        text
                    </div>
                </a>
            </div>
        </div>
    )
}
