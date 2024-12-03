import './App.css';
import Login from './Components/Login';
import Navbar from './Components/Navbar';
import Register from './Components/Register';
import Signup from './Components/Signup';
import Home from './Components/Home';
import Aboutus from './Components/Aboutus';
import Contact from './Components/Contact';
import Profile from './Components/Profile';
import { Route, Routes, BrowserRouter } from 'react-router-dom';
import Edit from './Components/Edit';

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Aboutus />} />
          <Route path='/details' element={<Home />} />
          <Route path='/auth/signup' element={<Signup />} />
          <Route path='/auth/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/profile/:id' element={<Profile />} />
          <Route path='/profile/:id/edit' element={<Edit />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
