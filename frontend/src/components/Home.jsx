import React from 'react'
import Navbar from '../sharedComp/Navbar'
import Dashboard from '../sharedComp/Dashboard'
import Products from '../sharedComp/Products'
import Slide from '../sharedComp/Slide'
import { Footer } from './Footer'

const Home = () => {
  
  return (
    <div>
        <Navbar />
        {/* <Dashboard /> */}
        <Slide/>
        <Products />
        <Footer/>
    </div>
  )
}

export default Home