import { useEffect, useState } from "react";
import { API_URL, doApiGet } from "../services/apiService";


export const useUser = () => {
    const [userInfo, setUserInfo] = useState({});

    useEffect(() => {
        getUserInfo();
    }, []);

    const getUserInfo = async () => {
        try {
            const url = API_URL + "/users/userInfo";
            const data = await doApiGet(url);
            if (data._id) {
                setUserInfo(data);
            }
        }
        catch (err) {
            console.log(err);
        }
    }
    return { userInfo }
}