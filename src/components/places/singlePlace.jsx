import React, { useContext, useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { BsFillBookmarkFill, BsBookmark } from "react-icons/bs";
import { AiOutlineArrowLeft } from "react-icons/ai";
import '../../css/places.css';
import PlaceMap from './placeMap';
import SamePlaceItem from './samePlaceItem';
import { MyContext } from '../../context/myContext';
import { toast } from 'react-toastify';


export default function SinglePlace() {
    const [isLiked, setIsLiked] = useState(true);
    const [place, setPlace] = useState({});
    const [samePlaces, setSamePlaces] = useState([1, 2, 3, 4])
    const params = useParams();
    const [loggedUser, setLoggesUser] = useState(false);
    const nav = useNavigate();
    const { userInfo, onDeleteOrAddToFavorite } = useContext(MyContext);

    useEffect(() => {
        if (userInfo.full_name) {
            setLoggesUser(true);
            if (userInfo.favorites.includes(params["id"])) {
                setIsLiked(false);
            }
        }
        getPlace();
    }, [])

    const getPlace = async () => {
        try {
            const url = API_URL + "/places/single/" + params["id"];
            const data = await doApiGet(url);
            console.log(data);
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
                    <h3>Same places:</h3>
                    {samePlaces.map((item, i) => {
                        // return (
                        //     // <SamePlaceItem key={i} />
                        // )
                    })}
                </React.Fragment>}
                <div onClick={() => {
                    if (loggedUser) {
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
