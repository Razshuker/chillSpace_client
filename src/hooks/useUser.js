import { useEffect, useState } from "react";
import { API_URL, TOKEN_KEY, doApiGet } from "../services/apiService";


export const useUser = () => {
    const [userInfo, setUserInfo] = useState({});

    const getUserInfo = async () => {
        try {
            if (localStorage[TOKEN_KEY]) {
                const url = API_URL + "/users/userInfo";
                const data = await doApiGet(url);
                if (data._id) {
                    setUserInfo(data);
                }
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return { getUserInfo, userInfo, setUserInfo }
}