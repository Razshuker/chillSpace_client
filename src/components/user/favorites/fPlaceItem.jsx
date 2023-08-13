import React, { useContext } from 'react'
import '../../../css/favorites.css'
import { BsFillBookmarkFill } from "react-icons/bs";
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../../context/myContext';


export default function FPlaceItem(props) {
    const place = props.item;
    const img_url = place.img_url || "/images/defualtImg.jpg";
    const nav = useNavigate();
    const { getUserInfo, onDeleteOrAddToFavorite } = useContext(MyContext);



    return (
        <div className='col-6 col-lg-4 backgroundItem'>
            <div style={{ backgroundImage: `url(${img_url})` }} className="place_item p-3 d-flex align-items-end justify-content-between">
                <p className='place_name m-0' onClick={() => {
                    nav("/places/" + place._id)
                }}>{place.name}</p>
                <button onClick={() => {
                    onDeleteOrAddToFavorite(place._id);
                    debugger;
                    getUserInfo();
                }} className='love_btn'>
                    <BsFillBookmarkFill className='h2 m-0' />
                </button>
            </div>
        </div>
    )
}
