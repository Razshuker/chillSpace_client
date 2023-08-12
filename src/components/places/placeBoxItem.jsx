import React from 'react'
import '../../css/aboutUs.css'

export default function PlaceBoxItem({ item }) {
    const img_url = item.img_url || "/images/defualtImg.jpg";
    return (
        <div style={{ backgroundImage: `url(${img_url})` }} className="place_box">
            <a href={`/places/${item._id}`}>
                <div className="place-name">{item.name}</div>
            </a>
        </div>
    )
}
