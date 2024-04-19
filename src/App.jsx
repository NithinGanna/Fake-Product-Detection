
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import AddProduct from './Components/AddProduct';
import RetrieveProduct from './Components/RetrieveProduct';
import { CustomerLogin } from './CustomerComponents/CustomerLogin';
import { CustomerRegister } from './CustomerComponents/CustomerRegister';
import CustomerHome from './CustomerPages/CustomerHome';
import Analyse from './CustomerComponents/Analyse';
import Summary from './CustomerComponents/Summary';
import QR from './Components/QR';
import Manufacturer from './Pages/Manufacturer';
import ExpiryAlerts from './CustomerComponents/ExpiryAlerts';
import LandingPage from './Pages/LandingPage';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<LandingPage/>} />
          <Route path='/home' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/manufacturer' element={<Manufacturer/>} />
          <Route path='/add-product' element={ <AddProduct/> } />
          <Route path='/retrieve-product' element={ <RetrieveProduct/>} />
          <Route path='/customer-login' element={ <CustomerLogin/>}/>
          <Route path='/customer-register' element={ <CustomerRegister/>}/>
          <Route path='/customer-home' element={<CustomerHome/>} />
          <Route path='/summary' element={<Summary/>} />
          <Route path='/analyse' element={ <Analyse/> } />
          <Route path='/qr' element={<QR/>} />
          <Route path='/expiry' element={<ExpiryAlerts/>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
