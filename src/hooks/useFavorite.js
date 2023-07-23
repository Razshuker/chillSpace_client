import { useState } from "react";
import { API_URL, doApiGet, doApiMethod } from "../services/apiService";


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


    const onDeleteOrAddToFavorite = async (place_id) => {
        try {
            const url = API_URL + "/users/editFavorite";
            const data = await doApiMethod(url, "PATCH", { place_id });
            if (data.modifiedCount) {
                getFavorites();
            }
        } catch (error) {
            console.log(error);
            alert("there is a problem, try again later");
        }
    }

    return { getFavorites, favorites, setFavorites, onDeleteOrAddToFavorite }
}