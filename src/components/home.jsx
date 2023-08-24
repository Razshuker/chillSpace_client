import React from 'react'
import "../css/home.css"
import Strip from './home/strip'
import Categories from './home/categories'
import WhereToTravel from './home/whereToTravel'

export default function Home() {
    return (
        <div className='container-fluid p-0 pb-3'>
            <Strip />
            <Categories />
            <WhereToTravel />
        </div>
    )
}
