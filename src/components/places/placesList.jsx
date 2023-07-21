import React, { useEffect, useState } from 'react'
import PlaceItem from './placeItem'
import { API_URL, doApiGet } from '../../services/apiService'
import { useScroll } from '../../hooks/useScroll';

export default function PlacesList() {
    const [places, setPlaces] = useState([]);
    const [page, setPage] = useState(1);
    const { isEnd, setScrollEndFalse } = useScroll();

    useEffect(() => {
        if (isEnd) {
            getPlaces();
        }
    }, [isEnd]);


    const getPlaces = async () => {
        try {
            const url = API_URL + `/places?page=${page}`;
            const data = await doApiGet(url);
            setPage((page) => page + 1)
            setPlaces((places) => [...places, ...data]);
            setScrollEndFalse();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="container">
            {places.map(item => {
                return (
                    <PlaceItem key={item._id} item={item} />
                )
            })}
        </div>
    )
}
