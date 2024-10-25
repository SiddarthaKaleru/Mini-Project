import React, { useState, useEffect } from 'react';
import Card from './Card';
import './Home.css';
import axios from 'axios';

const Home = () => {
  const [listings, setListings] = useState([]);
  let id = window.localStorage.getItem('id');
  useEffect(() => {
    const fetchData = async()=>{
      try {
        const response = await axios.get('http://localhost:8080/register');
        setListings(response.data);
      } catch (error) {
        console.error('Error fetching listings:', error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="homePage">
      {id && <h1>Welcome Back</h1>}
      <div className="allCards">
        {listings.map((listing, index) => (
          <Card imgURL={listing.image} id={listing._id} name={listing.fullName} batch={listing.batchYear} dept={listing.department} />
        ))}
      </div>
    </div>
  );
};

export default Home;
