import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate, useParams } from 'react-router-dom';
import '../../css/places.css';

export default function SinglePlace() {
    const [place, setPlace] = useState({});
    const params = useParams();
    const nav = useNavigate();

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
                {place.name && <React.Fragment>
                    <h2 className='text-center my-4'>{place.name}</h2>
                    <h3 className='text-center pb-4 m-0 pt-0'>{place.type}</h3>
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
                    <h3>Same places:</h3>
                </React.Fragment>}
            </div>
        </div>
    )
}
