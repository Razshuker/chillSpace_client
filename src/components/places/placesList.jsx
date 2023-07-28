import React, { useEffect, useState } from 'react'
import '../../css/places.css'
import PlaceItem from './placeItem'
import { API_URL, doApiGet } from '../../services/apiService'
import { useScroll } from '../../hooks/useScroll';
import { useSearchParams } from 'react-router-dom';
import UpButton from '../upButton';

export default function PlacesList({ page, setPage }) {
    const [places, setPlaces] = useState([]);
    const { isEnd, setScrollEndFalse } = useScroll();
    const [query] = useSearchParams();

    useEffect(() => {
        if (isEnd) {
            setPage((page) => page + 1)
            getPlaces();
        }
    }, [isEnd]);

    useEffect(() => {
        console.log(query.get("s"));
        getPlaces();
    }, [query]);


    const getPlaces = async () => {
        try {
            const url = query.get("s") ? API_URL + `/places?page=${page}&s=` + query.get("s") : API_URL + `/places?page=${page}`;
            // if(query.get("area")){
            //     url+=`&area=` + query.get("area");
            // }
            const data = await doApiGet(url);
            // setPage((page) => page + 1)
            setPlaces((places) => (page == 1 ? data : [...places, ...data]));
            setScrollEndFalse();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className="placeList container">
            {places.length == 0 ? <h2 className='noPlaces'>There aren't match places to the search : "{query.get("s")}"</h2> :

                places.map(item => {
                    return (
                        <PlaceItem key={item._id} item={item} />
                    )
                })
            }
            <UpButton />
        </div>
    )
}
