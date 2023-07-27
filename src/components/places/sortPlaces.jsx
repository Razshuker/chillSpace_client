import React from 'react'
import SearchForm from './searchForm'
import { useState } from 'react'
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate, useSearchParams } from 'react-router-dom';

export default function SortPlaces({ setShowSort, isShowSort }) {
    const [types,setTypes] = useState([]);
    const [arArea,setArArea] = useState([]);
    const nav = useNavigate();
    const [query] = useSearchParams();


    useEffect(()=> {
        doApiTypes()
    },[])

    const doApiTypes = async() => {
        const url = API_URL + "/types";
        const data = await doApiGet(url);
        setTypes(data);
    }
    const onSelectedArea = (_area) => {
        const updatedAreaArr = [...arArea];
        const isIn = updatedAreaArr.includes(_area);
        if (isIn) {
          const index = updatedAreaArr.indexOf(_area);
          updatedAreaArr.splice(index, 1);
        } else {
          updatedAreaArr.push(_area);
        }
        setArArea(updatedAreaArr);
        const searchParams = new URLSearchParams(query);
        searchParams.set("area", updatedAreaArr.join(",")); 
        nav("?" + searchParams.toString()); 
      };
  
    return (
        <div className='sortMenu border h-auto'>
            <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
            <div className='mt-5'>
                <h4 className='display-6 text-center'>Area</h4>
                <div className='m-4'>
                    <input  onClick={()=>{onSelectedArea("north")}} type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="north">North</label>
                </div>
                <div className='m-4'>
                    <input onClick={()=>{onSelectedArea("south")}} type="checkbox"  />
                    <label className='ms-1' htmlFor="south">South</label>
                </div>
                <div className='m-4'>
                    <input  onClick={()=>{onSelectedArea("center")}} type="checkbox"  />
                    <label className='ms-1' htmlFor="center">Center</label>
                </div>
                <div className='m-4'>
                    <input  onClick={()=>{onSelectedArea("jerusalem")}} type="checkbox"  />
                    <label className='ms-1' htmlFor="jerusalem">Jerusalem</label>
                </div>


                <h4 className='display-6 text-center'>What to do</h4>
                {types.map(item => {
                    return(
                <div className='m-4' key={item._id}>
                    <input type="checkbox"  />
                    <label className='ms-1' htmlFor={item.type_name}>{item.type_name}</label>
                </div>
                    )
                })}

            </div>
        </div>
    )
}
