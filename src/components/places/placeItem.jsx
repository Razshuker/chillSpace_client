import React, { useContext, useEffect, useState } from 'react'
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import '../../css/places.css'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext'
import { toast } from 'react-toastify';


export default function PlaceItem({ item }) {
    const nav = useNavigate();
    const [loggedUser, setLoggesUser] = useState(false);
    const { userInfo, onDeleteOrAddToFavorite } = useContext(MyContext);
    const [isLiked, setIsLiked] = useState(true);

    useEffect(() => {
        if (userInfo.full_name) {
            setLoggesUser(true);
        }
    }, []);

    useEffect(() => {
        if (userInfo.favorites && userInfo.favorites.includes(item._id)) {
            setIsLiked(false);
        }
    }, [userInfo.favorites]);

    return (
        <div className="mt-3">
            <div className='place_info p-3'>
                <div className="row">
                    <div onClick={() => {
                        nav(item._id);
                    }} className="col-md-4">
                        <img src={item.img_url || "images/defualtImg.jpg"} alt="placePic" className='image' />
                    </div>
                    <div className="info col-md-6">
                        <div onClick={() => {
                            nav(item._id);
                        }}>
                            <h4 className='display-6'>{item.name}</h4>
                            <p className='lead'>{item.description}</p>
                        </div>
                        <div className="row align-items-end">
                            {item.tags_name.map(tag => {
                                return (
                                    <button key={tag} onClick={() => nav("?tags=" + tag)} className='tags col'>{tag}</button>
                                )
                            })}
                        </div>
                    </div>
                    <div onClick={() => {
                        if (loggedUser) {
                            setIsLiked((isLiked) => !isLiked);
                            onDeleteOrAddToFavorite(item._id);
                        } else {
                            toast.warning("you must login to add this place to you favorite");
                        }
                    }} className="buttons d-flex align-items-end justify-content-end col-1 ">
                        {!isLiked ? <AiFillHeart  role="button"  className=' h2 text-danger p-0' /> : <AiOutlineHeart  role="button"  className='h2 p-0' />}
                    </div>
                </div>
            </div>
        </div>
    )
}
