
import './App.css';
import { BrowserRouter as Router , Routes , Route } from 'react-router-dom';
import Home from './Pages/Home';
import { Login } from './Components/Login';
import { Register } from './Components/Register';
import { PostNavBar } from './Components/PostNavBar';
import AddProduct from './Components/AddProduct';
import RetrieveProduct from './Components/RetrieveProduct';

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
        </Routes>
      </Router>
    </>
  )
}

export default App
