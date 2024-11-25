import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import ParentRouter from './Components/ReusableComponents/RouterComponent';
// import ParentRouter from './Components/RouterComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <ParentRouter/>
  </BrowserRouter>
);