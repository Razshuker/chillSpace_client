import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate } from 'react-router';

export default function SearchByLocation() {
    const [placesAr, setPlacesAr] = useState([]);
    const [placeSelected, setPlaceSelected] = useState("");
    const [placesMatch, setPlacesMatch] = useState([]);
    const nav = useNavigate();


    useEffect(() => {
        doApiPlaces();
    }, []);

    const doApiPlaces = async () => {
        try {            
            const url = API_URL + "/places?perPage=0";
            const data = await doApiGet(url);
            setPlacesAr(data);
            // console.log(data);
        } catch (error) {
            console.log(error);
        }
    };
    const onPlaceSelection = (_place) => {
        // console.log(_place);
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
            <input className='postInputs' placeholder='search for a place...' onChange={onChangePlace} type="text" value={placeSelected}/>
              {
                            placesMatch && placesMatch.map(place => {
                                return (
                                    <div key={place._id} onClick={() => onPlaceSelection(place.name)} className='col-md-12'  > {place.name} </div>
                                )
                            })
                        }
        </div>
    )
}
