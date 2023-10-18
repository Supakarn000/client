import './App.css'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import Home from "./pages/Home"
import Product from './pages/Product'
import Login from './pages/Login'
import Register from './pages/Register'
import TypePage from './pages/TypePage'
import Profile from './pages/Profile'
import Cart from './pages/CartPage'
import Data from './component/data'
import Add from './admin/add'




function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/register" element={<Register/>}/>
          <Route path="/login" element={<Login/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/product"element={<Product/>}/>
          <Route path="/shoes"element={<TypePage productType="shoes" />}/>
          <Route path="/shirt"element={<TypePage productType="shirt" />}/>
          <Route path="/pants"element={<TypePage productType="pants" />}/>
          <Route path="/other"element={<TypePage productType="other" />}/>
          <Route path="/cart"element={<Cart/>}/>
          <Route path="/data"element={<Data/>}/>
          <Route path="/add"element={<Add/>}/>

        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App

