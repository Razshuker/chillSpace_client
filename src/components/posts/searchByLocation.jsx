import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate } from 'react-router';
import { useRef } from 'react';
import { IoSearchOutline } from 'react-icons/io5';
import SearchPosts from './searchPosts';

export default function SearchByLocation() {
    const [placesAr, setPlacesAr] = useState([]);
    const [placeSelected, setPlaceSelected] = useState("");
    const [placesMatch, setPlacesMatch] = useState([]);
    const nav = useNavigate();
    const inputRf = useRef();


    useEffect(() => {
        doApiPlaces();
    }, []);

    const doApiPlaces = async () => {
        try {
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            setPlacesAr(data);
        } catch (error) {
            console.log(error);
        }
    };
    const onPlaceSelection = (_place) => {
        setPlaceSelected(_place)
        setPlacesMatch([])
        nav("?place=" + _place)
    }

    const onChangePlace = (e) => {
        let matches = [];
        let text = e.target.value
        setPlaceSelected(text);
        if (text.length > 0) {
            matches = placesAr.filter(place => {
                return place.name.toLowerCase().includes(text.toLowerCase());
            });
        }
        matches = matches.slice(0, 10);
        console.log(matches);
        setPlacesMatch(matches);
    };

    return (
        <div>
            <div className='d-flex justify-content-end pt-4 col-md-6 '>
                <input onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        nav("?s=" + inputRf.current.value);
                    }
                }} ref={inputRf} placeholder='Search by title...' className='postInputs input-group' />
                <button onClick={() => {
                    nav("?s=" + inputRf.current.value);
                }} className='searchBtn'><IoSearchOutline className='search_icon' /></button>
            </div>
            <div>
                <input className='postInputs' placeholder='search for a place...' onChange={onChangePlace} type="text" value={placeSelected} />
                {
                    placesMatch && placesMatch.map(place => {
                        return (
                            <div key={place._id} onClick={() => onPlaceSelection(place.name)} className='col-md-12'  > {place.name} </div>
                        )
                    })
                }
            </div>
            <div>
                {/* <SearchPosts/> */}
            </div>


        </div>
    )
}
