import React, { useContext, useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiService'
import FPlaceItem from './fPlaceItem';
import { MyContext } from '../../../context/myContext';

export default function PlaceArea() {
    const [favorites, setFavorites] = useState([]);
    const { userInfo } = useContext(MyContext)

    useEffect(() => {
        getFavorites();
        console.log(userInfo);
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

    const onDeleteFromFavorite = async (post_id) => {
        try {
            const url = API_URL + "/users/editFavorite";
            const data = await doApiMethod(url, "PATCH", { post_id });
            if (data.modifiedCount) {
                getFavorites();
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later");
        }
    }

    return (
        <div className='conatiner-fluid'>
            <div className="container">
                <h3>My favorites</h3>
                <div className="row g-3">
                    {favorites.map(item => {
                        return (
                            <FPlaceItem key={item._id} item={item} onDeleteFromFavorite={onDeleteFromFavorite} />
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
