import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
// import ParentRouter from './Components/ReusableComponents/RouterComponent';
import RouterComponent from './Components/RouterComponent';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
  <RouterComponent/>
  <ToastContainer/>
  </BrowserRouter>
);