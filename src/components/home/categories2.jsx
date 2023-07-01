import React, { useEffect, useState, useRef } from 'react'
import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import CategoryItem from './categoryItem';
import { API_URL, doApiGet } from '../../services/apiService'
import './css.css'


export default function Categories2() {
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
        if (contentRef.current && contentRef.current.scrollLeft <= 24) {
            setBackActive(true);
        } else {
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
                <div onScroll={scrollFun} ref={contentRef} className="row content align-items-center justify-content-center">
                    <HiArrowLeft onClick={onBack} className='col-1 back-icon' />
                    <div className="categories_box col-10">
                        {categories.map((item, i) => {
                            return (
                                <CategoryItem key={i} item={item} className="category" />
                            )
                        })}
                    </div>
                    <HiArrowRight onClick={onNext} className='col-1 next-icon' />
                </div>
            </div>
        </div>
    )
}