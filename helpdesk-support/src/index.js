import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import FormComponent from './Component/FormComponent';
import Create from './Create';
import Edit from './Edit';
import EditUser from './EditUser';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    
    
    <Routes>
      <Route path='/home' element={<App />} />
      <Route path='/' element={<FormComponent />} />
      <Route path='/create' element={<Create />} />
      <Route path='/edit' element={<Edit />} />
      <Route path='/edituser/:id' element={<EditUser />} />
    </Routes>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
