import React from 'react'
import SearchForm from './searchForm'
import { useState } from 'react'
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';

export default function SortPlaces({ setShowSort, isShowSort }) {
    const [types,setTypes] = useState([]);

    useEffect(()=> {
        doApiTypes()
    },[])

    const doApiTypes = async() => {
        const url = API_URL + "/types";
        const data = await doApiGet(url);
        setTypes(data);
    }

    return (
        <div className='sortMenu border h-auto'>
            <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
            <div className='mt-5'>
                <h4 className='display-6 text-center'>location</h4>
                <div className='m-4'>
                    <input type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="north">North</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="south">South</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="center">Center</label>
                </div>
                <div className='m-4'>
                    <input type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="jerusalem">Jerusalem</label>
                </div>


                <h4 className='display-6 text-center'>what to do</h4>
                {types.map(item => {
                    return(
                <div className='m-4'>
                    <input type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor={item.type_name}>{item.type_name}</label>
                </div>
                    )
                })}

            </div>
        </div>
    )
}
