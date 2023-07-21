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
                    <div className='col-lg-4 col-12 m-0 p-0'>
                    <SortPlaces setShowSort={setShowSort} isShowSort={isShowSort}  />
                    </div>
                    <div className="col-lg-8 col-12 m-0 p-0">
                    <PlacesList  />
                    </div>
                </div> :
                <div className='container-fluid'>
                    <SearchForm setShowSort={setShowSort} isShowSort={isShowSort}  />
                    <PlacesList />
                </div>
            }

        </div>
    )
}
