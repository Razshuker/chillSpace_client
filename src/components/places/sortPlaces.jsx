import React from 'react'
import SearchForm from './searchForm'
import { useState } from 'react'
import { useEffect } from 'react';
import { API_URL, doApiGet } from '../../services/apiService';
import { useNavigate, useSearchParams } from 'react-router-dom';
import '../../css/places.css'

export default function SortPlaces({ setShowSort, isShowSort }) {
    const [types, setTypes] = useState([]);
    const [arArea, setArArea] = useState([]);
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);
    const [selectedTypes, setSelectedTypes] = useState([]);
    const [selectedCats, setSelectedCats] = useState([]);
    const nav = useNavigate();
    const [query] = useSearchParams();

    useEffect(() => {
        doApiTypes();
        doApiCategories();
        doApiTags();
        initByQuery();
    }, [])

    const initByQuery = () => {
        if (query.get("area")) {
            setArArea(query.get("area").split(','));
        }
        if (query.get("types")) {
            setSelectedTypes(query.get("types").split(','));
        }
        if (query.get("tags")) {
            setSelectedTags(query.get("tags").split(','));
        }
        if (query.get("cats")) {
            setSelectedCats(query.get("cats").split(','));
        }
    }

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

    const onSelected = (_selected, _queryName) => {
        let updatedArr = [];
        switch (_queryName) {
            case 'area':
                updatedArr = [...arArea]
                break;
            case 'tags':
                updatedArr = [...selectedTags];
                break;
            case 'types':
                updatedArr = [...selectedTypes];
                break;
            case 'cats':
                updatedArr = [...selectedCats];
                break;
        }
        const isIn = updatedArr.includes(_selected);
        if (isIn) {
            const index = updatedArr.indexOf(_selected);
            updatedArr.splice(index, 1);
        } else {
            updatedArr.push(_selected);
        }
        switch (_queryName) {
            case 'area':
                setArArea(updatedArr);
                break;
            case 'tags':
                setSelectedTags(updatedArr);
                break;
            case 'types':
                setSelectedTypes(updatedArr)
                break;
            case 'cats':
                setSelectedCats(updatedArr)
                break;
        }
        const searchParams = new URLSearchParams(query);
        searchParams.set(_queryName, updatedArr.join(","));
        nav("?" + searchParams.toString());
    };

    const isQueryExists = (_qKey, _qValue) => {
        let isIn = false;
        if (query.get(_qKey)) {
            const arrValues = query.get(_qKey).split(',');
            isIn = arrValues.includes(_qValue);
        }
        return isIn;
    }

    return (
        <div className='sortMenu border h-auto sort_places p-2 '>
            <SearchForm setShowSort={setShowSort} isShowSort={isShowSort} />
            <div className='mt-5 px-3'>
                <h4 className='display-6 p-2'>Area</h4>
                <div className='row pb-4 px-3'>
                    <div className='pt-3 col-auto form-check form-check-inline '>
                        <input defaultChecked={isQueryExists("area", "north")} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected("north", "area") }} type="checkbox" name="scales"
                        />
                        <label className='form-check-label' htmlFor="north">North</label>
                    </div>
                    <div className='pt-3 col-auto form-check form-check-inline'>
                        <input defaultChecked={isQueryExists("area", "south")} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected("south", "area") }} type="checkbox" />
                        <label className='form-check-label' htmlFor="south">South</label>
                    </div>
                    <div className='pt-3 col-auto form-check form-check-inline'>
                        <input defaultChecked={isQueryExists("area", "center")} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected("center", "area") }} type="checkbox" />
                        <label className='form-check-label' htmlFor="center">Center</label>
                    </div>
                    <div className='pt-3 col-auto form-check form-check-inline'>
                        <input defaultChecked={isQueryExists("area", "jerusalem")} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected("jerusalem", "area") }} type="checkbox" />
                        <label className='form-check-label' htmlFor="jerusalem">Jerusalem</label>
                    </div>
                </div>
                <hr />
                <h4 className='display-6 p-2'>What to do</h4>
                <div className='row px-3 pb-4 '>
                    {types.map(item => {
                        return (
                            <div className='pt-3 col-auto form-check form-check-inline ' key={item._id}>
                                <input defaultChecked={isQueryExists("types", item.type_name)} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected(item.type_name, "types") }} type="checkbox" />
                                <label className='form-check-label' htmlFor={item.type_name}>{item.type_name}</label>
                            </div>
                        )
                    })}
                </div>
                <hr />
                <h4 className='display-6 p-2'>Categoris</h4>
                <div className='row px-3 pb-4'>
                    {categories.map(item => {
                        return (
                            <div className='pt-3 col-auto form-check form-check-inline' key={item._id}>
                                <input defaultChecked={isQueryExists("cats", item.category_code)} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected(item.category_code, "cats") }} type="checkbox" />
                                <label className='form-check-label' htmlFor={item.category_code}>{item.name}</label>
                            </div>

                        )
                    })}
                </div>
                <hr />
                <h4 className='display-6 p-2'>Tags</h4>
                <div className='row px-3 pb-4'>
                    {tags.map(item => {
                        return (
                            <div className='pt-3 col-auto form-check form-check-inline' key={item._id}>
                                <input defaultChecked={isQueryExists("tags", item.tag_name)} className='form-check-input border-dark border-opacity-50' onClick={() => { onSelected(item.tag_name, "tags") }} type='checkbox' />
                                <label className='form-check-label' htmlFor={item.tag_name}>{item.tag_name}</label>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
