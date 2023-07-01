import { useContext, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";
import { MyContext } from "../context/myContext";


export const useFavorite = () => {
    const [favorites, setFavorites] = useState({});
    const { userInfo } = useContext(MyContext);



    const getPlaces = async () => {
        try {
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            const filterData = data.filter(item => {
                return userInfo.favorites.includes(item._id);
            })
            setFavorites(filterData);
        } catch (error) {
            console.log(error);
        }
    }
    return { getPlaces, favorites, setFavorites }
}