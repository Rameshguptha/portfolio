import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ReactDOM from 'react-dom/client';
import App from './App';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

  <Router>
  <Routes>
    {/* Wildcard route to catch all paths */}
    <Route path="*" element={    <App />} />
  </Routes>
</Router>

);

