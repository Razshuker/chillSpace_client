import React from 'react'
// import { HiArrowLeft, HiArrowRight } from "react-icons/hi";
import CategoryItem from './categoryItem';


export default function Categories() {
    const ar = [1, 2, 3, 4];
    return (
        <div className="container-fluid my-5">
            <div className="container">
                <h2 className='display-3 text-center'>CATEGORIES</h2>
                <div className="row align-items-center">
                    {/* <HiArrowLeft className='col-1' /> */}
                    {ar.map(item => {
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