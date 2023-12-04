import "primereact/resources/themes/lara-light-indigo/theme.css";
import 'primeicons/primeicons.css';     
import { useState } from 'react'

import './App.css'
import {BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './components/UserCrud/Users'
import CreateUser from './components/UserCrud/CreateUser'
import UpdateUser from './components/UserCrud/UpdateUser'
import Dashboard from './components/Dashboard'
import Employee from './components/EmployeCrud/Employee'
import CreateEmp from './components/EmployeCrud/CreateEmp'
import UpdateEmp from './components/EmployeCrud/UpdateEmp'
import Loginpage from "./components/Login/Loginpage";
import SignupPage from "./components/Signup/SignupPage";
import UserProfile from "./components/UserProfile/userprofile";
import Product from "./components/Products/Product";
import CreateProducts from "./components/Products/CreateProducts";

function App() {

  const isAuthenticated = () => {
    return localStorage.getItem('username') !== null;
};
const ProtectedRoute = ({ element }) => {
  if (!isAuthenticated()) {
      return <Navigate to="/" />;
  }

  return element;
};
const [openSidebarToggle, setOpenSidebarToggle] = useState(false)

  const OpenSidebar = () => {
    setOpenSidebarToggle(!openSidebarToggle)
  }
  return (
    <div>
      <div >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Loginpage/>}></Route>
          <Route path='/signup' element={<SignupPage/>}></Route>
          <Route path='/dashboard' element={<ProtectedRoute element={<Dashboard />} />} />
          <Route path='/user' element={<ProtectedRoute element={<Users />} />} />
          <Route path='/user/create' element={<ProtectedRoute element={<CreateUser />} />} ></Route>
          <Route path='/user/update/:id' element={<ProtectedRoute element={<UpdateUser />} />} ></Route>
          <Route path='/employee' element={<ProtectedRoute element={<Employee />} />} ></Route>
          <Route path='/employee/create' element={<ProtectedRoute element={<CreateEmp />} />} ></Route>
          <Route path='/employee/update/:id' element={<ProtectedRoute element={<UpdateEmp />} />} ></Route>
          <Route path='/userprofile/:id' element={<ProtectedRoute element={<UserProfile />} />} ></Route>
          <Route path='/product' element={<ProtectedRoute element={<Product />} />} />
          <Route path='/product/create' element={<ProtectedRoute element={<CreateProducts />} />} ></Route>

        </Routes>
      </BrowserRouter>
      </div>
      
    </div>
  )
}

export default App
