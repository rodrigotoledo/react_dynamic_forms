import React from 'react';
import ReactDOM from 'react-dom/client';
import './tailwind.css';
import App from './App';
import axios from 'axios';
// axios.defaults.baseURL = process.env.REACT_APP_API_HTTP_ADDRESS;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);