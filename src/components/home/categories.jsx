import React, { useEffect, useState, useRef } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import CategoryItem from './categoryItem';
import { API_URL, doApiGet } from '../../services/apiService'
import '../../css/home.css'


export default function Categories() {
    const contentRef = useRef(null);
    const [categories, setCategories] = useState([]);
    const [isBackActive, setBackActive] = useState(true);
    const [isNextActive, setNextActive] = useState(true);


    useEffect(() => {
        getCategories();
    }, [])

    const getCategories = async () => {
        const url = API_URL + "/categories?perPage=0";
        const data = await doApiGet(url);
        setCategories(data);
    }

    const scrollFun = () => {
        if (contentRef.current && contentRef.current.scrollLeft >= 24) {
            console.log(contentRef.current.scrollLeft);
            setBackActive(true);
        } else {
            console.log(contentRef.current.scrollLeft);
            setBackActive(false);
        }

        let scrollMaxValue = contentRef.current.scrollWidth - contentRef.current.clientWidth - 24;
        if (contentRef.current.scrollLeft >= scrollMaxValue) {
            setNextActive(false);
        } else {
            setNextActive(true);
        }
    };

    const onNext = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft += 300;
        }
    };

    const onBack = () => {
        if (contentRef.current) {
            contentRef.current.scrollLeft -= 300;
        }
    };


    return (
        <div className="categories container-fluid my-5">
            <div className="container">
                <h2 className='text-center'>CATEGORIES</h2>
                <div onScroll={scrollFun} ref={contentRef} className="content">
                    <HiArrowLeft onClick={onBack} className={`d-none d-md-block back-icon ${isBackActive ? 'active' : ''}`} />
                    <div className="categories_row">
                        {categories.map((item, i) => {
                            return (
                                <CategoryItem key={item._id} item={item} />
                            )
                        })}
                    </div>
                    <HiArrowRight onClick={onNext} className={`d-none d-md-block next-icon ${isNextActive ? 'active' : ''}`} />
                </div>
            </div>
        </div>
    )
}