import React, { useState } from 'react'
import '../../App.css'
import '../../css/favorites.css'
import PlaceArea from './favorites/placeArea'
import Map from './favorites/map'
import { toast } from 'react-toastify'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiService'
import { useUser } from '../../hooks/useUser'

export default function Favorites() {
    const [favorites, setFavorites] = useState([]);
    const { getUserInfo } = useUser();


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
            console.log(error);
        }
    }


    const onDeleteOrAddToFavorite = async (place_id) => {
        try {
            const url = API_URL + "/users/editFavorite";
            const data = await doApiMethod(url, "PATCH", { place_id });
            if (data.modifiedCount) {
                getUserInfo();
                getFavorites();
            }
        } catch (error) {
            console.log(error);
            toast.error("there is a problem, try again later");
        }
    }
    return (
        <div className='favorites container-fluid'>
            <div className="container">
                <div className="row">
                    <div className="placeArea col-lg-7">
                        <PlaceArea onDeleteOrAddToFavorite={onDeleteOrAddToFavorite} favorites={favorites} getFavorites={getFavorites} />
                    </div>
                    <div className="map col-lg-5">
                        <Map favorites={favorites} getFavorites={getFavorites} />
                    </div>
                </div>
            </div>
        </div>
    )
}
