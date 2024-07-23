import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import axios from '../api/axios';
import './Login.css'
import { jwtDecode } from 'jwt-decode';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const navigate = useNavigate();
  const LOGIN_URL = '/api/login/';

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        LOGIN_URL, 
        { username, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true
        }
      );
      console.log('Login response:', response.data);
      const { access, refresh } = response.data;
      const { exp } = jwtDecode(access)
      

      localStorage.setItem('access', access);
      localStorage.setItem('refresh', refresh);
      localStorage.setItem('Tokenexpiry', exp);
      // console.log(localStorage.getItem('Tokenexpiry'))

      console.log('Tokens set in local storage');
      navigate('/home');
    } catch (error) {
      console.error('Login error:', error.response.data.error);
      setError(error.response.data.error);
    }
  };

  return (
    <section className="form-container">
      <form onSubmit={handleSubmit}>
      <div className="header">
        <div className="text">Log into safetywhat</div>
        <div className="underline">Enter details to continue</div>
      </div>
      <div className="inputs">
        <div className="labels">Username:</div>
        <div className="input">
          <input 
            type="text" 
            placeholder='username'
            value={username} 
            onChange={(e) => setUsername(e.target.value)} 
          />
        </div>
        <div className="labels">Password:</div>
        <div className="input">
          <input 
            type="password" 
            placeholder='password'
            value={password} 
            onChange={(e) => setPassword(e.target.value)} 
          />
        </div>
      </div>
      <div className="forget-password">
        <span>Forget password ?</span>
      </div>
      <div className="submit-container">
        <button type="submit" className="submit">Login</button>
      </div>
      {error && <p style={{ color: 'red' }}>{error}</p>}
    </form>
    </section>
  );
};

export default Login;
