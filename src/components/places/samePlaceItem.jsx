import React from 'react'
import '../../css/home.css'


export default function SamePlaceItem() {
    const img_url = "/images/categoryDefault.jpg";
    // const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div style={{ backgroundImage: `url(${img_url})` }} className="cat_box">
            <a href={`/places/`}></a>
        </div>
    )
}
