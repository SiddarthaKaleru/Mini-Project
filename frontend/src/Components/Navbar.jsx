import React, { useState, useEffect } from 'react';
import './Navbar.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user, setUser] = useState(false); 
  useEffect(() => {
    let id=window.localStorage.getItem('id');
    if(id){
      setUser(true)
    }
  }, []); 

  const handleLogout = () => {
    axios.get('http://localhost:8080/auth/logout', {}, { withCredentials: true })
      .then((res) => {
      console.log(res.data);
      setUser(false);
      window.localStorage.removeItem('id'); 
    })
      .catch(err => {
        console.log('Error during logout:', err);
      });
  };

  return (
    <div className='nav'>
      <div className='title'>
        <Link to="/" className='text-decoration-none'>
          <h2>Memory Weave</h2>
        </Link>
      </div>
      <div className='items'>
        <Link to="/">Home</Link>
        <Link to="/contact">Contact</Link>
        {user ? (
          <div className='changers'>
            <Link to="/details">Student Profiles</Link>
            <Link to="/register">Add Your Profile</Link>
            <Link to="/">
            <button onClick={handleLogout} className='logout-btn'>Logout</button>
            </Link>
          </div>
        ) : (
          <div className='changers'>
            <Link to="/auth/login">Login</Link>
            <Link to="/auth/signup">Signup</Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
