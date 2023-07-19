import React, { useEffect, useState } from 'react'
import PlaceItem from './placeItem'
import { API_URL, doApiGet } from '../../services/apiService'

export default function PlacesList() {
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        getPlaces();
    }, []);

    const getPlaces = async () => {
        try {
            const url = API_URL + "/places";
            const data = await doApiGet(url);
            console.log(data);
            setPlaces(data);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            {places.map(item => {
                return (
                    <PlaceItem key={item._id} item={item} />
                )
            })}
        </div>
    )
}
