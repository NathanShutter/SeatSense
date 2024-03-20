import './App.css';
import React from 'react';
import Login from './components/LoginPage/login';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div>
      <Login />
    </div>
  );
}

export default App;
