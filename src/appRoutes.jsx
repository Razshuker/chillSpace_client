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
import Footer from './components/footer'
import PlacesList from './admin_components/places/placesList'
import EditPlace from './admin_components/places/editPlace'
import ReportedPosts from './admin_components/posts/reportedPosts'

export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/*' element={<AdminHeader />}/>
                <Route path='/*' element={<Header />}/>
            </Routes>

            <Routes>
                <Route path='/admin' element={<Login />}/>
                <Route path='/admin/places' element={<PlacesList />}/>
                <Route path='/admin/places/add' element={<AddPlace />}/>
                <Route path='/admin/places/edit/:id' element={<EditPlace />}/>
                <Route path='/admin/reportedPosts' element={<ReportedPosts />}/>
                <Route path='/admin/users' element={<UsersList />}/>
                <Route path='/admin/categories' element={<CategoriesList />}/>
                <Route path='/admin/categories/add' element={<AddCategory />}/>
                <Route path='/admin/categories/edit/:id' element={<EditCategory />}/>
                <Route path='/*' element={<Page404 />}/>
                <Route path='/' element={<Home />}/>
            </Routes>
            <Routes>
                <Route path='/*' element={<Footer />}/>
            </Routes>
        </BrowserRouter>
    )
}
