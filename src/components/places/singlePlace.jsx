import React, { useEffect, useState } from 'react'
import { API_URL, TOKEN_KEY, doApiGet, doApiMethod } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import '../../css/places.css';
import PlaceMap from './placeMap';
import SamePlaceItem from './samePlaceItem';
import { toast } from 'react-toastify';


export default function SinglePlace() {
    const [isLiked, setIsLiked] = useState(true);
    const [place, setPlace] = useState({});
    const [samePlaces, setSamePlaces] = useState([1, 2, 3, 4])
    const params = useParams();
    const nav = useNavigate();
    const [userDetails, setUserDetails] = useState({});

    useEffect(() => {
        getUserDetails();
        getPlace();
    }, []);

    useEffect(() => {
        if (place._id) {
            getSamePlaces();
        }
    }, [place])

    useEffect(() => {
        if (userDetails._id && userDetails.favorites.includes(params["id"])) {
            setIsLiked(false);
        }
    }, [userDetails]);

    const getUserDetails = async () => {
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

    const getSamePlaces = async () => {
        try {
            const url = API_URL + "/places?perPage=4&types=" + place.type + "&exclude=" + place._id;
            const data = await doApiGet(url);
            setSamePlaces(data);
        } catch (error) {
            console.log(error);
        }
    }


    const onDeleteOrAddToFavorite = async (place_id) => {
        try {
            const url = API_URL + "/users/editFavorite";
            const data = await doApiMethod(url, "PATCH", { place_id });
            if (data.modifiedCount) {
                getUserDetails();
            }
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later");
        }
    }


    const getPlace = async () => {
        try {
            const url = API_URL + "/places/single/" + params["id"];
            const data = await doApiGet(url);
            setPlace(data);
        } catch (error) {
            console.log(error);
        }
    }
    return (
        <div className='singlePlace container-fluid'>
            <div className="container">
                <AiOutlineArrowLeft className='backArrow' onClick={() => {
                    nav(-1);
                }} />
                {place.name && <React.Fragment>
                    <h2 className='text-center my-4'>{place.name}</h2>
                    <h3 onClick={() => {
                        nav("/places?type=" + place.type);
                    }} className='text-center pb-4 m-0 pt-0 tpye-h3'>{place.type}</h3>
                    <img src={place.img_url || "images/defualtImg.jpg"} alt="placePic" className='placePic float-start pe-5' />
                    <p><strong>Area:</strong> {place.area}</p>
                    <p><strong>City:</strong> {place.city}</p>
                    <p><strong>Phone:</strong> {place.phone}</p>
                    <p>{place.description}</p>
                    {place.tags_name.map(tag => {
                        return (
                            <button key={tag} onClick={() => nav("/places?tags=" + tag)} className='tags col'>{tag}</button>
                        )
                    })}
                    <hr />
                    <h3>Opening hours:</h3>
                    <p><strong>Sunday: </strong>{place.open_hours.Sunday}</p>
                    <p><strong>Monday: </strong>{place.open_hours.Monday}</p>
                    <p><strong>Tuesday: </strong>{place.open_hours.Tuesday}</p>
                    <p><strong>Wednesday: </strong>{place.open_hours.Wednesday}</p>
                    <p><strong>Thursday: </strong>{place.open_hours.Thursday}</p>
                    <p><strong>Friday: </strong>{place.open_hours.Friday}</p>
                    <p><strong>Saturday: </strong>{place.open_hours.Saturday}</p>
                    <hr />
                    <PlaceMap place={place} />
                    <hr />
                    <h3 className='mt-3'>Similar places:</h3>
                    <div className="row mb-5 g-2">
                        {samePlaces.map((item, i) => {
                            return (
                                <SamePlaceItem key={i} item={item} />
                            )
                        })}
                    </div>
                </React.Fragment>}
                <div onClick={() => {
                    if (localStorage[TOKEN_KEY]) {
                        setIsLiked((isLiked) => !isLiked);
                        onDeleteOrAddToFavorite(params["id"]);
                    } else {
                        toast.warning("you must login to add this place to you favorite");
                    }

                }} className="buttons d-flex justify-content-end col-1 w-100 pe-4">
                    {!isLiked ? <BsFillBookmarkFill className='saveIcon-single' /> : <BsBookmark className='saveIcon-single' />}
                </div>
            </div>
        </div>
    )
}
