"use client"
import Header from './Header'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Cart from './Cart'
import Home from './Home'

const ShoppingCart = () => {
  return (
    <BrowserRouter>
      <Header />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
            
          <Route path='/cart'  element={<Cart />}/>
         
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default ShoppingCart
