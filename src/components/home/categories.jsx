import React, { useEffect, useState } from 'react'
// import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import CategoryItem from './categoryItem';
import { API_URL, doApiGet } from '../../services/apiService'


export default function Categories() {
    const [Categories, setCategories] = useState([]);

    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=0";
        const data = await doApiGet(url);
        setCategories(data);
    }
    return (
        <div className="container-fluid my-5">
            <div className="container">
                <h2 className='display-3 text-center'>CATEGORIES</h2>
                <div className="row align-items-center">
                    {/* <HiArrowLeft className='col-1' /> */}
                    {Categories.map(item => {
                        return (
                            <CategoryItem key={item} />
                        )
                    })}
                    {/* <HiArrowRight className='col-1' /> */}
                </div>
            </div>
        </div>
    )
}