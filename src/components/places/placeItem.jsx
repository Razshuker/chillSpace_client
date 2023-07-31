import React, { useContext, useEffect, useState } from 'react'
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import '../../css/places.css'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext'
import { toast } from 'react-toastify';


export default function PlaceItem({ item }) {
    const nav = useNavigate();
    const [loggedUser, setLoggesUser] = useState(false);
    const [isLiked, setIsLiked] = useState(true);
    const [isShowMore, setIsShowMore] = useState(false);
    const { userInfo, onDeleteOrAddToFavorite } = useContext(MyContext);

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

    const onReadMoreLess = () => {
        setIsShowMore(!isShowMore);
    }

    return (
        <div className="mt-3">
            <div className='place_info p-3'>
                <div className="row">
                    <div className='p-3' onClick={() => {
                        nav(item._id);
                    }}>
                        <img src={item.img_url || "images/defualtImg.jpg"} alt="placePic" className='image float-start' />
                        <h4 className='display-6'>{item.name}</h4>
                        {(item.description.length < 200) ?
                        <p>{item.description}</p>
                        :
                        <div>
                            <p className='lead'>{(item.description).substring(0, 200)}
                            {isShowMore ? (
                                <span>{(item.description).substring(200)}</span>
                            ): "..."}
                        </p>
                        <div className='inline'>
                        <button className='btn btn-light py-1' onClick={onReadMoreLess}>{isShowMore ? <span>Read Less <AiOutlineUp className='opacity-50 small'/></span> :<span>Read More <AiOutlineDown className='opacity-50 small'/></span>}</button>
                        </div>
                        </div>
                    }     
                    </div>
                </div>
                <div className="row flex-wrap">
                    <div onClick={() => {
                        if (loggedUser) {
                            setIsLiked((isLiked) => !isLiked);
                            onDeleteOrAddToFavorite(item._id);
                        } else {
                            toast.warning("you must login to add this place to you favorite");
                        }

                    }} className="buttons d-flex justify-content-end col-1 w-100 pe-4">
                        {!isLiked ? <BsFillBookmarkFill className='h1 saveIcon' /> : <BsBookmark className='h1 saveIcon' />}
                    </div>
                    <div className="row align-items-end col-11 ms-3">
                        {item.tags_name.map(tag => {
                            return (
                                <button key={tag} onClick={() => nav("?tags=" + tag)} className='tags col'>{tag}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
