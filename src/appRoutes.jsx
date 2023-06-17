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
import LoginAdmin from './admin_components/loginAdmin'
import Footer from './components/footer'
import PlacesList from './admin_components/places/placesList'
import EditPlace from './admin_components/places/editPlace'
import ReportedPosts from './admin_components/posts/reportedPosts'
import Signup from './components/signup'
import Login from './components/login';
import UpdateUserInfo from './components/user/updateUserInfo'
import PostsList from './components/postsList'


export default function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/admin/*' element={<AdminHeader />} />
                <Route path='/*' element={<Header />} />
            </Routes>

            <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/sign-up' element={<Signup />} />
            <Route path='/posts' element={<PostsList />} />
            <Route path='user/updateAccount' element={<UpdateUserInfo />} />

            <Route path='/admin' element={<LoginAdmin />} />
            <Route path='/admin/places' element={<PlacesList />} />
            <Route path='/admin/places/add' element={<AddPlace />} />
            <Route path='/admin/places/edit/:id' element={<EditPlace />} />
            <Route path='/admin/reportedPosts' element={<ReportedPosts />} />
            <Route path='/admin/users' element={<UsersList />} />
            <Route path='/admin/categories' element={<CategoriesList />} />
            <Route path='/admin/categories/add' element={<AddCategory />} />
            <Route path='/admin/categories/edit/:id' element={<EditCategory />} />

            <Route path='/*' element={<Page404 />} />

            </Routes>
            <Routes>
                <Route path='/*' element={<Footer />} />
            </Routes>
        </BrowserRouter>
    )
}
