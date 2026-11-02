import './App.css';
import Navbar from './Components/Navbar';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Footer from './Components/Footer';
import Signup from './Components/Signup';
import PrivateComponent from './Components/PrivateComponent';
import Login from './Components/Login';
import AddProduct from './Components/AddProduct';
import ProductsList from './Components/ProductsList';
import UpdateProduct from './Components/UpdateProduct';


function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>

          <Route element={<PrivateComponent />}>

            <Route path='/' element={<ProductsList/>}></Route>
            <Route path='/addProducts' element={<AddProduct />}></Route>
            <Route path='/updateProducts/:id' element={<UpdateProduct/>}></Route>
            <Route path='/logout' element={<h1>Logout</h1>}></Route>
          </Route>

          <Route path='/signup' element={<Signup />}></Route>
          <Route path='/login' element={<Login />}></Route>
        </Routes>

      </BrowserRouter>
      <Footer />
    </div >
  );
}

export default App;
