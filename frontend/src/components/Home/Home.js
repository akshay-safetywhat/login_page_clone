import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Tile from './Tile/Tile'; 
import './Home.css';

const HomePage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true); 
  const [error, setError] = useState(null);
  const OPTION_URL = '/api/user_options/';
  const token = localStorage.getItem('access');
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(OPTION_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setData(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, [OPTION_URL, token]);
  // console.log(data)

  const handleTileClick = (tile) => {
    // console.log('Tile clicked:', tile);
    navigate('/dashboard', {
      state: { tile }
    });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <div className='hello'>
        <h1>👋</h1>
        <h1 >Hello !</h1>
      </div>
      <div className="tiles">
        {data.map((tile, index) => (
          <Tile
            key={index}
            title={tile.title}
            description={tile.description}
            onClick={() => handleTileClick(tile)}
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
