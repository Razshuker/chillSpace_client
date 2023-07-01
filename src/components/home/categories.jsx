import React, { useEffect, useState } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import CategoryItem from './categoryItem';
import { API_URL, doApiGet } from '../../services/apiService'


export default function Categories() {
    const [categories, setCategories] = useState([]);
    const [startIndex, setStartIndex] = useState(0);
    const [showCat, setShowCat] = useState([4]);

    useEffect(() => {
        getCategories();
    }, [showCat])

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=0";
        const data = await doApiGet(url);
        setCategories(data);
        setShowCat(data.splice(startIndex, 4));
    }

    const plus1Category = () => {
        console.log(startIndex + 1);
        if (startIndex + 1 <= categories.length) {
            const filterAr = categories.splice(startIndex + 1, 4);
            console.log(filterAr);
            setStartIndex(startIndex + 1);
        } else {
            const filterAr = categories.splice(0, 4);
            console.log(filterAr);
            setStartIndex(0);
        }
    }

    const minus1Category = () => {
        console.log(startIndex - 1);
        if (startIndex - 1 >= 0) {
            const filterAr = categories.splice(startIndex - 1, 4);
            console.log(filterAr);
            setStartIndex(startIndex - 1);
        } else {
            const filterAr = categories.splice(categories.length - 4, 4);
            console.log(filterAr);
            setStartIndex(categories.length - 4);
        }
    }
    return (
        <div className="categories container-fluid my-5">
            <div className="container">
                <h2 className='text-center'>CATEGORIES</h2>
                <div className="row align-items-center justify-content-center">
                    <HiArrowLeft onClick={minus1Category} className='col-1' />
                    {showCat.map((item, i) => {
                        return (
                            <CategoryItem key={i} item={item} />
                        )
                    })}
                    <HiArrowRight onClick={plus1Category} className='col-1' />
                </div>
            </div>
        </div>
    )
}