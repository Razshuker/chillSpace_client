import React from 'react'
import '../../css/home.css'
import { BsFillSuitHeartFill } from "react-icons/bs";


export default function CategoryItem() {
    return (
        <div className='col'>
            <div className='border category_box p-3'>
                <BsFillSuitHeartFill className='text-danger h2 m-0' />
            </div>
        </div>
    )
}
