import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../../services/apiService'
import FPlaceItem from './fPlaceItem';

export default function PlaceArea() {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        getFavorites();
    }, []);

    const getFavorites = async () => {
        try {
            const url = API_URL + "/users/favorites";
            const data = await doApiGet(url);
            getPlaces(data);
        } catch (error) {
            console.log(error);
        }
    }

    const getPlaces = async (_favorites) => {
        try {
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            const filterData = data.filter(item => {
                return _favorites.includes(item._id);
            })
            setFavorites(filterData);
        } catch (error) {

        }
    }

    return (
        <div className='conatiner-fluid'>
            <div className="container">
                <h3>My favorites</h3>
                <div className="row">
                    {favorites.map(item => {
                        return (
                            <FPlaceItem key={item._id} item={item} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
