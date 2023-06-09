import React from 'react'
import { BrowserRouter, Route, Routes } from "react-router-dom"
import AddPlace from './admin_components/places/addPlace'
import Page404 from './components/page404'
import UsersList from './admin_components/usersList'
import AdminHeader from './admin_components/adminHeader'
import Header from './components/header'
import Home from './components/home'
import CategoriesList from './admin_components/categories/categoriesList'
import AddCategory from './admin_components/categories/addCategory'
import EditCategory from './admin_components/categories/editCategory'
import Login from './admin_components/login'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/*' element={<AdminHeader />}></Route>
                <Route path='/*' element={<Header />}></Route>
            </Routes>

            <Routes>
                <Route path='/admin' element={<Login />}></Route>
                <Route path='/admin/places/add' element={<AddPlace />}></Route>
                <Route path='/admin/users' element={<UsersList />}></Route>
                <Route path='/admin/categories' element={<CategoriesList />}></Route>
                <Route path='/admin/categories/add' element={<AddCategory />}></Route>
                <Route path='/admin/categories/edit/:id' element={<EditCategory />}></Route>
                <Route path='/*' element={<Page404 />}></Route>
                <Route path='/' element={<Home />}></Route>
            </Routes>
        </BrowserRouter>
    )
}
