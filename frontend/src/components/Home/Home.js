import React, { useState, useEffect } from 'react';
import axios from '../api/axios';
import { useNavigate } from 'react-router-dom';
import Tile from './Tile/Tile'; // Assuming Tile component
import './Home.css';

const HomePage = () => {
  const [tiles, setTiles] = useState([]);
  const [loading, setLoading] = useState(true); // Add loading state
  const [error, setError] = useState(null); // Add error state
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
        setTiles(response.data);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching data: " + error.message);
        setLoading(false);
      });
  }, [OPTION_URL, token]);

  const handleTileClick = (tile) => {
    console.log('Tile clicked:', tile); 
    // navigate('/dashboard');
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="home-page">
      <div>
        <h1></h1>
      </div>
      <div>
        <h1 className='hello'>Hello !</h1>
      </div>
      <div className="tiles">
        {tiles.map((tile, index) => (
          <Tile
            key={index}
            // Uncomment and provide icon prop if needed
            // icon={tile.icon}
            title={tile.title}
            description={tile.description}
            onClick={() => handleTileClick(tile)} // Pass tile data to handler
          />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
