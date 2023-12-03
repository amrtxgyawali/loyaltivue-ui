// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:8080/api/auth/login', {
        userId,
        password,
      });

      const userDetails = response.data;

      switch (userDetails.role) {
        case 'ADMIN':
          navigate(`/app/admin/${userId}`,);
          break;
        case 'SHOPKEEPER':
          navigate(`/app/shopkeeper/${userId}`);
          break;
        case 'CUSTOMER':
          navigate(`/app/customer/${userId}`);
          break;
        default:
          console.error('Invalid role');
      }
    } catch (error) {
      document.getElementById("errorLbl").innerHTML = "Invalid userId or password, Please try again with valid credentials.";
      console.error('Login failed', error);
    }
  };

  return (
    <div className="container mt-5 d-flex justify-content-center align-items-center">
      <div className="rounded p-4 shadow" style={{ width: '300px' }}>
        <h2 className="text-center mb-4">LoyaltiVue</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="userId" className="form-label float-start">
              User ID:
            </label>
            <input
              type="text"
              className="form-control"
              id="userId"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label float-start">
              Password:
            </label>
            <input
              type="password"
              className="form-control"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button
            type="button"
            className="btn btn-primary w-100"
            onClick={handleLogin}
          >
            Login
          </button>
        </form>
        <p id="errorLbl" className='text-danger'></p>
      </div>
    </div>
  );
};

export default Login;
