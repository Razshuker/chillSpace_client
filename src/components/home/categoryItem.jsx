import React from 'react'
import '../../css/home.css'
import { useNavigate } from 'react-router-dom'


export default function CategoryItem({ item }) {
    const nav = useNavigate();
    const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div style={{ backgroundImage: `url(${img_url})` }} className="cat_box">
            <a href={`?category=${item.name}`}>
                <div className="category-name">{item.name}</div>
            </a>
        </div>
    )
}
