import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
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






// import React, { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import axios from '../api/axios'; // Assuming axios is in the api folder
// import './Login.css';
// import { jwtDecode } from 'jwt-decode';

// const Login = () => {
//   const [credentials, setCredentials] = useState({ username: '', password: '' });
//   const [error, setError] = useState(null);

//   const navigate = useNavigate();
//   const LOGIN_URL = '/api/login/'; 

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await axios.post(LOGIN_URL, credentials, {
//         headers: { 'Content-Type': 'application/json' },
//         withCredentials: true 
//       });
//       console.log('Login response:', response.data);

//       const { access, refresh } = response.data;
//       const { exp } = jwtDecode(access); 

//       localStorage.setItem('access', access);
//       localStorage.setItem('refresh', refresh);
//       localStorage.setItem('Tokenexpiry', exp * 1000);y

//       console.log('Tokens set in local storage');
//       navigate('/home');
//     } catch (error) {
//       console.error('Login error:', error.response.data.error);
//       setError(error.response.data.error);
//     }
//   };

//   const handleChange = (e) => {
//     setCredentials({ ...credentials, [e.target.name]: e.target.value });
//   };

//   return (
//     <div className="login_form"> {/* Adjust class name if needed */}
//       <h1 className="display-1">Login App</h1> {/* Adjust heading if needed */}
//       <form onSubmit={handleSubmit}>
//         <div className="mb-3">
//           <label htmlFor="username" className="form-label">
//             Username
//           </label>
//           <input
//             type="text"
//             name="username"
//             className="form-control"
//             id="username"
//             aria-describedby="usernameHelp"
//             onChange={handleChange}
//             required
//             value={credentials.username}
//           />
//           <div id="usernameHelp" className="form-text">
//             Enter your username.
//           </div>
//         </div>
//         <div className="mb-3">
//           <label htmlFor="password" className="form-label">
//             Password
//           </label>
//           <input
//             type="password"
//             name="password"
//             className="form-control"
//             id="password"
//             onChange={handleChange}
//             required
//             value={credentials.password}
//           />
//         </div>
//         <div className="mb-3 form-check"> {/* Remove checkbox if not needed */}
//           <input
//             type="checkbox"
//             className="form-check-input"
//             id="exampleCheck1"
//           />
//           <label className="form-check-label" htmlFor="exampleCheck1">
//             Remember me
//           </label>
//         </div>
//         <button type="submit" className="btn btn-success">
//           Login
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//     </div>
//   );
// };

// export default Login;
