import React from 'react';
import "../../css/posts.css"
import { AccountCircle } from '@mui/icons-material';
import { AiOutlineClose } from 'react-icons/ai';
import { useEffect } from 'react';

export default function LikesLightbox({ setShowLikes, likes, getLikes }) {
    const handleOverlayClick = (event) => {
        if (event.target.classList.contains("bg-dark")) {
            setShowLikes(false);
        }
    };

    useEffect(()=> {
        // debugger;
        console.log(likes);
        // getLikes()
    },[])

    return (
        <div className="likes-lightbox-overlay bg-dark" onClick={handleOverlayClick}>
            <div className="likes-lightbox-content">
                <div className="d-flex justify-content-between p-3  border-bottom">
                    <h2 className="mx-auto my-0 h5 font-weight-bold">Likes</h2>
                    <div
                        onClick={() => { setShowLikes(false) }}
                        className="cursor-pointer text-black-50 hover-text-gray-500 transition duration-200"
                    >
                        <span role='button' className=''><AiOutlineClose/></span>
                    </div>
                </div>
                {likes.length === 0 ? (
                    <p className="p-3 text-center">
                        This post has no likes yet.
                    </p>
                ) : (
                    <ul className="list-unstyled overflow-auto mt-2 ms-1" style={{ maxHeight: '300px', width:"250px" }}>

                        {likes.map((item, index) => (
                            <li
                                key={index}
                                className={`p-2 ${index === likes.length - 1 ? "rounded-bottom" : ""} hover:bg-gray-200 transition duration-200`}
                            >
                                {item.img_url ? 
                                <img
                                    src={item.img_url}
                                    className="rounded-circle mr-2"
                                    style={{ width: '40px', height: '40px' }}
                                    alt={`${item.nickname}'s profile`}
                                /> : <AccountCircle className='profile_icon' fontSize='large' />
                                }
                               <span className='ps-2'>{item.nickname}</span> 
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}
