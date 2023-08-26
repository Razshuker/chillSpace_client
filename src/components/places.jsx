import React, {useState } from 'react'
import '../css/places.css'
import SortPlaces from './places/sortPlaces';
import PlacesList from './places/placesList';
import SearchForm from './places/searchForm';

export default function Places() {
    const [isShowSort, setShowSort] = useState(false);

    return (
        <div className='mb-3'>
            <div className='container-fluid row m-0 p-0'>
                <div className={isShowSort ? 'col-lg-4 m-0 p-0' : 'd-none'}>
                    <SortPlaces setShowSort={setShowSort} isShowSort={isShowSort} />
                </div>
                <div className={isShowSort ? 'd-none' : ''}>
                    <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
                </div>
                <div className={isShowSort ? "col-lg-8 m-0 p-0" : 'col-12'}>
                    <PlacesList />
                </div>
            </div>


        </div>
    )
}
