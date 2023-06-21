import React from 'react'
import { BsFillSuitHeartFill } from "react-icons/bs";


export default function FPlaceItem(props) {
    const place = props.item;
    const img_url = place.img_url || "/images/defualtImg.jpg";



    return (
        <div className='col-md-6 col-lg-4'>
            <div style={{ backgroundImage: `url(${img_url})` }} className="place_item p-3 d-flex align-items-end">
                <button onClick={() => {
                    props.onDeleteFromFavorite(place._id);
                }} className='love_btn'>
                    <BsFillSuitHeartFill className='text-danger h2 m-0' />
                </button>
            </div>
        </div>
    )
}
