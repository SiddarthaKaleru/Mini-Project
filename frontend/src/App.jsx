import './App.css'
import Login from './Components/Login'
import Navbar from './Components/Navbar'
import Register from './Components/Register'
import Signup from './Components/Signup'
import Home from './Components/Home'
import Aboutus from './Components/Aboutus'
import Contact from './Components/Contact'
import Profile from './Components/Profile'
import {Route,Routes,BrowserRouter} from 'react-router-dom'
function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path='/' element={<Aboutus/>}></Route>
          <Route path='/details' element={<Home/>}></Route>
          <Route path='/auth/signup' element={<Signup/>}></Route>
          <Route path='/auth/login' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/contact' element={<Contact/>}></Route>
          <Route path='/profile/:id' element={<Profile/>}></Route>
        </Routes>
      </BrowserRouter>
    </>
  )
}
export default App
