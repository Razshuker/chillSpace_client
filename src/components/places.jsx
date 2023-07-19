import React, { useState } from 'react'
import '../css/places.css'
import SortPlaces from './places/sortPlaces';
import PlacesList from './places/placesList';
import SearchForm from './places/searchForm';

export default function Places() {
    const [isShowSort, setShowSort] = useState(false);
    return (
        <div className='mb-3'>
            {isShowSort ?
                <div className='container-fluid row'>
                    <SortPlaces setShowSort={setShowSort} isShowSort={isShowSort} className='col-6' />
                    <PlacesList className="col-6" />
                </div> :
                <div className='container-fluid'>
                    <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
                    <PlacesList />
                </div>
            }

        </div>
    )
}
