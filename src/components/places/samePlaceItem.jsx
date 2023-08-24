import React from 'react'
import '../../css/places.css'


export default function SamePlaceItem({ item }) {
    const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div className="col-md-3 col-6">
            <div style={{ backgroundImage: `url(${img_url})` }} className="samePlaces">
                <a href={`/places/` + item._id}>
                    <div className='place-name'>
                        {item.name}
                    </div>
                </a>
            </div>
        </div>
    )
}
