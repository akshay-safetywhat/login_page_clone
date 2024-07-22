import React from 'react';
import './Navbar/Navbar'
import Navbar from './Navbar/Navbar';

const App = () => {
  const token = localStorage.getItem('access');


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
  return (
    
    <Navbar />
  );
};

export default App;
