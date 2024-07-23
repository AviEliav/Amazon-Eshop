import './App.css'
// import Title from './components/shared/Title.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Home from './pages/HomePage.jsx';
import Footer from './components/shared/Footer.jsx';
import Header from './components/shared/Header.jsx';
import SignIn from './pages/SignIn.jsx';
import SignUp from './pages/SignUp.jsx';
import '@fortawesome/fontawesome-free/css/all.min.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProductPage from './pages/ProductPage.jsx';
import CartPage from './pages/CartPage.jsx';
import ShippingAddressPage from './pages/ShippingAddressPage.jsx';
import PaymentPage from './pages/PaymentPage.jsx';
import SubmitOrderPage from './pages/SubmitOrderPage.jsx';
import OrderPage from './pages/OrderPage.jsx';
import SearchPage from './pages/SearchPage.jsx';

function App() {
  return (
    <> 
      <BrowserRouter>
        <div className='d-flex flex-column side-allPage min-width'>
          <ToastContainer position='bottom-center' limit={1}/>
          <Header/>
          <main>
            <Container className='mt-3'>
              <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/signin' element={<SignIn/>}></Route>
                <Route path='/signup' element={<SignUp/>}></Route>
                <Route path='/Product/:token' element={<ProductPage/>}></Route>
                <Route path='/cart' element={<CartPage/>}></Route>
                <Route path='/shipping' element={<ShippingAddressPage/>}></Route>
                <Route path='/payment' element={<PaymentPage/>}></Route>
                <Route path='/placeorder' element={<SubmitOrderPage/>}></Route>
                <Route path='/order/:id' element={<OrderPage/>}></Route>
                <Route path='/search' element={<SearchPage/>}></Route>
              </Routes>
            </Container>
          </main>
          <Footer/>
        </div>
      </BrowserRouter>
    </>
  )
}

export default App
