import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../services/apiService';
import { useParams } from 'react-router-dom';
import '../css/places.css';

export default function SinglePlace() {
    const [place, setPlace] = useState({});
    const params = useParams();

    useEffect(() => {
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
                <h2 className='text-center my-4'>{place.name}</h2>
                <h3 className='text-center pb-4 m-0 pt-0'>{place.type}</h3>
                <img src={place.img_url || "images/defualtImg.jpg"} alt="placePic" className='placePic float-start pe-5' />
                <p>{place.description}</p>
                <p><strong>Area:</strong> {place.area}</p>
                <p><strong>City:</strong> {place.city}</p>
                <p><strong>Phone:</strong> {place.phone}</p>
                <p><strong>Opening hours:</strong></p>

            </div>
        </div>
    )
}
