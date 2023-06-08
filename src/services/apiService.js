import axios from 'axios'

export const API_URL = "http://localhost:3001";

export const doApiGet = async (_url) => {
    const resp = await axios.get(_url)
    return resp.data;
}