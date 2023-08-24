import React, { useContext, useEffect, useState } from 'react'
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineUp, AiOutlineDown } from "react-icons/ai";
import '../../css/places.css'
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';


export default function PlaceItem({ item, setPage }) {
    const nav = useNavigate();
    const [isLiked, setIsLiked] = useState(false);
    const [isShowMore, setIsShowMore] = useState(false);
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getUserInfo();
    }, [])


    useEffect(() => {
        if (userDetails.favorites && userDetails.favorites.includes(item._id)) {
            setIsLiked(true);
        }
    }, [userDetails.favorites]);

    const getUserInfo = async () => {
        try {
            if (localStorage[TOKEN_KEY]) {
                const url = API_URL + "/users/userInfo";
                const data = await doApiGet(url);
                if (data._id) {
                    setUserDetails(data);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }

    const onDeleteOrAddToFavorite = async (place_id) => {
        try {
            const url = API_URL + "/users/editFavorite";
            const data = await doApiMethod(url, "PATCH", { place_id });
            if (data.modifiedCount) {
                getUserInfo();
            }
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later");
        }
    }

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
                        if (localStorage[TOKEN_KEY]) {
                            setIsLiked((isLiked) => !isLiked);
                            onDeleteOrAddToFavorite(item._id);
                        } else {
                            toast.warning("you must login to add this place to you favorite");
                        }

                    }} className="buttons d-flex justify-content-end col-1 w-100 pe-4">
                        {isLiked ? <BsFillBookmarkFill className='h1 saveIcon' /> : <BsBookmark className='h1 saveIcon' />}
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
