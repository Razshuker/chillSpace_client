import React, { useContext, useEffect } from 'react'
import { API_URL, doApiMethod } from '../../../services/apiService'
import FPlaceItem from './fPlaceItem';
import { MyContext } from '../../../context/myContext';

export default function PlaceArea() {
    const { favorites, getFavorites } = useContext(MyContext)

    useEffect(() => {
        getFavorites();
    }, []);

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
