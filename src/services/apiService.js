import axios from 'axios'

export const API_URL = "http://localhost:3001";
export const TOKEN_KEY = "token";

export const doApiGet = async (_url) => {
    const resp = await axios.get(_url)
    return resp.data;
}

export const doApiMethod = async (_url, _method, _dataBody) => {
    const resp = await axios({
        url: _url,
        method: _method,
        data: _dataBody,
        headers: {
            "x-api-key": localStorage[TOKEN_KEY]
        }
    })
    return resp.data;
}