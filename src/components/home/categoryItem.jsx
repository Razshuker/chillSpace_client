import React from 'react'
import '../../css/home.css'


export default function CategoryItem({ item }) {
    const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div style={{ backgroundImage: `url(${img_url})` }} className="cat_box">
            <a href={`/places?category=${item.name}`}>
                <div className="category-name">{item.name}</div>
            </a>
        </div>
    )
}
