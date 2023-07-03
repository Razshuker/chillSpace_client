import { useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";


export const useFavorite = () => {
    const [favorites, setFavorites] = useState([]);


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
    return { getFavorites, favorites, setFavorites }
}