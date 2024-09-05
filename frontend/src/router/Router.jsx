import React from 'react'
import { createBrowserRouter } from 'react-router-dom'
import Home from '../components/Home'
import Signup from '../components/Signup'
import Login from '../components/Login'
import ProtectedParent from '../components/ProtectedParent'
import UnProtected from '../components/UnProtected'
import ProtectedRoutes from '../components/ProtectedRoutes'
import Profile from '../components/Profile'
import MyOrder from '../components/MyOrder'
import Order from '../components/Order'
import Admin from '../components/Admin'
import AdminUser from '../components/AdminUser'
import Cart from '../components/Cart'
import AdminProduct from '../components/AdminProduct'
import AdminOrder from '../components/AdminOrder'
import SuccessPayment from '../components/SuccessPayment'
import CancelPayment from '../components/CancelPayment'
import Checkout from '../components/Checkout'
import AboutUs from '../components/AboutUs'
import ContactUs from '../components/ContactUs'

const Router = createBrowserRouter([
    
    {
        element : <ProtectedParent />,
        children : [
            {
                path : "/",
                element : <Home />
            },
            {
                path : "/cart",
                element : <Cart />
            },
            {
                path : "/aboutus",
                element : <AboutUs/>
            },
            {
                path : "/contactus",
                element : <ContactUs/>
            },
            {
                path : "/paymentsuccess",
                element  : <SuccessPayment />
            },
            {
                path : "/cancelPayment",
                element  : <CancelPayment />
            },
            {
                element : <UnProtected />,
                children : [
                   
                    {
                        path : "/login",
                        element : <Login />
                    },
                    {
                        path : "/signup",
                        element : <Signup />
                    }
                ]
            },
            {
                element : <ProtectedRoutes allowedRole = {["user","admin"]} />,
                children : [
                    {
                        path : "/profile",
                        element : <Profile />
                    }
                ]
            },
            {
                element : <ProtectedRoutes allowedRole={["user"]}/>,
                children : [
                    {
                        path : "/myorder",
                        element : <MyOrder />
                    },
                    {
                        path : "/order",
                        element  : <Order />
                    },
                    {
                        path : "/checkout",
                        element : <Checkout />
                    }
                    
                ]
            },
            {
                element : <ProtectedRoutes allowedRole={["admin"]} />,
                children : [
                    {
                        path : "/admin",
                        element : <Admin />
                    },
                    {
                        path : "/adminuser",
                        element : <AdminUser />
                    },
                    {
                        path : "/adminproduct",
                        element : <AdminProduct />
                    },
                    {
                        path : "/adminorder",
                        element : <AdminOrder />
                    }
                ]
            },
            
        ]
    }
    
])

export default Router