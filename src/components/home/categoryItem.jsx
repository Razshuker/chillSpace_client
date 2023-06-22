import React from 'react'
import '../../css/home.css'
import { useNavigate } from 'react-router-dom'


export default function CategoryItem({ item }) {
    const nav = useNavigate();
    const img_url = item.img_url || "/images/categoryDefault.jpg";
    return (
        <div className='col'>
            <div style={{ backgroundImage: `url(${img_url})` }} onClick={() => {
                nav("?category=" + item.name);
            }} className='border category_box p-3'>
                <h4>{item.name}</h4>
            </div>
        </div>
    )
}
