
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/DashboardPage/dashboard';
import SignUp from './components/RegisterPage/signup';
import SignInSide from './components/LoginPage/login';
import { login } from './auth/auth.js';

function App() {
  const handleLogin = async (email, password) => {
    try {
      // Perform authentication logic here...
      console.log('Logging in with:', email, password);
      // Call the login function from auth.js
      // Pass the email and password to authenticate
      await login(email, password);

      // Redirect to the dashboard page after successful login
      return <Navigate to="/dashboard" />;
    } catch (error) {
      console.error('Login failed:', error.message);
      // Handle login error
      // For example, display an error message to the user
    }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide onLogin={handleLogin} />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;