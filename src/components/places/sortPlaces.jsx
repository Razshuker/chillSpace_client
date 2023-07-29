import React from 'react'
import SearchForm from './searchForm'
import { useState } from 'react'
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../css/places.css'
import { Style } from '@mui/icons-material';

export default function SortPlaces({ setShowSort, isShowSort , setPage }) {
    const [types, setTypes] = useState([]);
    const [arArea, setArArea] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags,setSelectedTags] = useState([]);
    const nav = useNavigate();
    const [query] = useSearchParams();

    useEffect(() => {
        doApiTypes();
        doApiCategories();
        doApiTags();
    }, [])

    const doApiTypes = async () => {
        try {
            const url = API_URL + "/types?perPage=0";
            const data = await doApiGet(url);
            setTypes(data);
        } catch (error) {
            console.log(error);
        }
    }
    const doApiCategories = async () => {
        try {
            const url = API_URL + "/categories?perPage=0";
            const data = await doApiGet(url);
            setCategories(data);
        } catch (error) {
            console.log(error);
        }

    }
    const doApiTags = async () => {
        try {
            const url = API_URL + "/tags?perPage=0";
            const data = await doApiGet(url);
            setTags(data);
        } catch (error) {
            console.log(error);
        }
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

    const onSelectedTags = (_tag) => {
        const updatedTagsArr = [...selectedTags];
        const isIn = updatedTagsArr.includes(_tag);
        if (isIn) {
            const index = updatedTagsArr.indexOf(_tag);
            updatedTagsArr.splice(index, 1);
        } else {
            updatedTagsArr.push(_tag);
        }
        setSelectedTags(updatedTagsArr);
        const searchParams = new URLSearchParams(query);
        searchParams.set("tags", updatedTagsArr.join(","));
        nav("?" + searchParams.toString());
    };

    return (
        <div className='sortMenu border h-auto sort_places p-2'>
            <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} setPage={setPage}/>
            <div className='mt-5'>
                <h4 className='display-6 text-center p-2'>Area</h4>
                <div className='row pb-4 px-3'>
                <div className=' pt-3 col-6'>
                    <input onClick={() => { onSelectedArea("north") }} type="checkbox" name="scales" />
                    <label className='ms-1' htmlFor="north">North</label>
                </div>
                <div className=' pt-3 col-6'>
                    <input onClick={() => { onSelectedArea("south") }} type="checkbox" />
                    <label className='ms-1' htmlFor="south">South</label>
                </div>
                <div className=' pt-3 col-6'>
                    <input onClick={() => { onSelectedArea("center") }} type="checkbox" />
                    <label className='ms-1' htmlFor="center">Center</label>
                </div>
                <div className=' pt-3 col-6'>
                    <input onClick={() => { onSelectedArea("jerusalem") }} type="checkbox" />
                    <label className='ms-1' htmlFor="jerusalem">Jerusalem</label>
                </div>
                </div>

                <h4 className='display-6 text-center p-2'>What to do</h4>
                <div className='row px-3 pb-4'>
                {types.map(item => {
                    return (
                        <div className=' pt-3 col-6' key={item._id}>
                            <input type="checkbox" />
                            <label className='ms-1' htmlFor={item.type_name}>{item.type_name}</label>
                        </div>
                    )
                })}
                </div>
                <h4 className='display-6 text-center p-2'>Categoris</h4>
                <div className='row px-3 pb-4'>
                {categories.map(item => {
                    return (
                        <div className='pt-3 col-6' key={item._id}>
                            <input type="checkbox" />
                            <label className='ms-1' htmlFor={item.categories_code}>{item.name}</label>
                        </div>

                    )
                })}
                </div>
                <h4 className='display-6 text-center p-2'>Tags</h4>
                <div className='row'>
                    {tags.map(item => {
                        return (
                            <div className='col-auto' key={item._id}>
                                <button onClick={ () => {onSelectedTags(item.tag_name)}}  className='tags'>{item.tag_name}</button>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
