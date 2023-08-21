import React, { useContext, useEffect, useState } from 'react'
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import '../../css/places.css'
import { useNavigate } from 'react-router-dom';
import { MyContext } from '../../context/myContext'
import { toast } from 'react-toastify';
import { TOKEN_KEY } from '../../services/apiService';


export default function PlaceItem({ item, setPage }) {
    const nav = useNavigate();
    const [loggedUser, setLoggedUser] = useState(false);
    const [isLiked, setIsLiked] = useState(true);
    const [isShowMore, setIsShowMore] = useState(false);
    const { userInfo, onDeleteOrAddToFavorite, getUserInfo } = useContext(MyContext);

    useEffect(() => {
        if (userInfo.full_name && localStorage[TOKEN_KEY]) {
            setLoggedUser(true);
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
                    <div className='p-3'>
                        <img onClick={() => {
                            nav(item._id);
                        }} src={item.img_url || "images/defualtImg.jpg"} alt="placePic" className='image float-start' />
                        <h4 role='button' onClick={() => {
                            nav(item._id);
                        }} className='display-6'>{item.name}</h4>
                        {(item.description.length < 200) ?

                            <p className='lead'>{item.description}</p>
                            :
                            <div>
                                <p className='lead'>{(item.description).substring(0, 200)}
                                    {isShowMore ? (
                                        <span>{(item.description).substring(200)}</span>
                                    ) : "..."}
                                </p>
                                <div className='inline'>
                                    <button className='py-1 readMoreBtn' onClick={onReadMoreLess}>{isShowMore ? <span>Read Less <AiOutlineUp className='opacity-50 small' /></span> : <span>Read More <AiOutlineDown className='opacity-50 small' /></span>}</button>
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
                            getUserInfo();
                        } else {
                            toast.warning("you must login to add this place to you favorite");
                        }

                    }} className="buttons d-flex justify-content-end col-1 w-100 pe-4">
                        {!isLiked ? <BsFillBookmarkFill className='h1 saveIcon' /> : <BsBookmark className='h1 saveIcon' />}
                    </div>
                    <div className="row align-items-end col-11 ms-3">
                        {item.tags_name.map(tag => {
                            return (
                                <button key={tag} onClick={() => {
                                    setPage(1);
                                    nav("?tags=" + tag);
                                }
                                } className='tags col'>{tag}</button>
                            )
                        })}
                    </div>
                </div>
            </div>
        </div>
    )
}
