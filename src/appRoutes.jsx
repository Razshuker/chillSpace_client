import React from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import UsersList from './admin_components/usersList'
import Page404 from './components/pageComps/page404'
import Home from './components/pageComps/home'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/users' element={<UsersList />} />
                <Route path='/' element={<Home />} />
                <Route path='/*' element={<Page404 />} />
            </Routes>
        </BrowserRouter>
    )
}
