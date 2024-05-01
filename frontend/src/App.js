import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/DashboardPage/dashboard';
import SignUp from './components/RegisterPage/signup';
import SignInSide from './components/LoginPage/login';
import Client from './components/ClientPage/client';
import Notification from "./components/NotificationsPage/notifications.js";
import Profile from "./components/ProfilePage/profile.js";
import PasswordReset from "./components/PasswordPage/passwordReset.js";
import RootDashboard from './components/RootDashPage/rootDash.js';
import { login, isAuthenticated } from './auth/auth.js';

function App() {
  const [userRole, setUserRole] = useState(sessionStorage.getItem('userRole'));

  const handleLogin = async (email, password) => {
    try {
      // Call the login function from auth.js
      // Pass the email and password to authenticate
      await login(email, password);

      // Retrieve user role from session storage
      const role = sessionStorage.getItem('userRole');
      setUserRole(role);

      // Redirect user to appropriate dashboard based on role
      if (role === 'root') {
        return <Navigate to="/root-dash" />;
      } else {
        return <Navigate to="/dashboard" />;
      }
    } catch (error) { }
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<SignInSide onLogin={handleLogin} />} />
        <Route path="/signup-page" element={<SignUp />} />
        <Route path="/password-reset-page" element={<PasswordReset />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/client" element={<Client />} />
        <Route path="/notification" element={<Notification />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/root-dash" element={<RootDashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
