
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { PostNavBar } from './Components/PostNavBar';
import AddProduct from './Components/AddProduct';
import RetrieveProduct from './Components/RetrieveProduct';
import { CustomerLogin } from './CustomerComponents/CustomerLogin';
import { CustomerRegister } from './CustomerComponents/CustomerRegister';

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/register' element={<Register/>} />
          <Route path='/manufacturer' element={<PostNavBar/>} />
          <Route path='/add-product' element={ <AddProduct/> } />
          <Route path='/retrieve-product' element={ <RetrieveProduct/>} />
          <Route path='/customer-login' element={ <CustomerLogin/>}/>
          <Route path='/customer-register' element={ <CustomerRegister/>}/>
        </Routes>
      </Router>
    </>
  )
}

export default App
