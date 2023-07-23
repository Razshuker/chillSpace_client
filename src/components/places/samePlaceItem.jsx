import React from 'react'
// import '../../css/home.css'


export default function SamePlaceItem({ item }) {
    const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div style={{ backgroundImage: `url(${img_url})` }} className="cat_box">
            <a href={`/places/` + item._id}></a>
        </div>
    )
}
