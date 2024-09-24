import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Auth.css";
const Login = () => {
    const [email, SetEmail] = useState("");
    const [password, SetPassword] = useState("");
  const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    console.log("Username:", email);
    console.log("Password:", password);
  
    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email:email,password:password }),
      });
  
      const data = await res.json();
      console.log("Response Data:", data);
  
      if (res.ok) {
        localStorage.setItem('token', data.token);
        alert('Login successful!');
        navigate("/");  // Redirect to home page after login
      } else {
        alert(data.message || 'Login failed. Please check your credentials.');
      }
    } catch (error) {
      console.error("Error during login:", error);
      alert('An error occurred. Please try again.');
    }
  };
  

  return (
    <div className="login">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          placeholder="email"
          value={email}
          onChange={(e) => SetEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => SetPassword(e.target.value)}
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
