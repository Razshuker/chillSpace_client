import React from 'react'
import {BrowserRouter,Route,Routes} from "react-router-dom"
import AddPlace from './admin_components/places/addPlace'

export default function AppRoutes() {
    return (
        <BrowserRouter>
        <Routes>
            <Route path='/admin/places/add' element={<AddPlace/>}></Route>
        </Routes>
        </BrowserRouter>
    )
}
