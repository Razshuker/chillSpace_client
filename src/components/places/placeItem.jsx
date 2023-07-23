import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import '../../css/places.css'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext'


export default function PlaceItem({ item }) {
    const nav = useNavigate();
    const { userInfo } = useContext(MyContext);
    const [isLiked, setIsLiked] = useState(true);

    useEffect(() => {
        if (userInfo.name && userInfo.favorites.includes(item._id)) {
            setIsLiked(false)
        }
    })

    return (
        <div className="mt-3">
            <div onClick={() => {
                nav(item._id);
            }} className='place_info p-3'>
                <div className="row">
                    <div className="col-md-4">
                        <img src={item.img_url || "images/defualtImg.jpg"} alt="placePic" className='image' />
                    </div>
                    <div className="info col-md-6">
                        <h4 className='display-6'>{item.name}</h4>
                        <p className='lead'>{item.description}</p>
                        <div className="row align-items-end">
                            {item.tags_name.map(tag => {
                                return (
                                    <button key={tag} onClick={() => nav("?tags=" + tag)} className='tags col'>{tag}</button>
                                )
                            })}
                        </div>
                    </div>
                    <div className="buttons d-flex align-items-end justify-content-end col-1">
                        {!isLiked ? <AiFillHeart className=' h2 text-danger' /> : <AiOutlineHeart className='h2 ' />}

                        {/* <BsFillSuitHeartFill className='text-danger h2 m-0 mb-2' /> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
