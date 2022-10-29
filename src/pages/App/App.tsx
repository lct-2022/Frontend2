import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginForm from '../Login';
import SignupForm from '../Signup';
import Profile from '../User';
import Home from '../Home';

import './App.css';

function Main() {
  return (
    <h1>Main</h1>
  )
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home/>}/>

        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/login" element={<LoginForm/>}/>
        <Route path="/prifile" element={<Profile/>}/>

        <Route path="/:user" element={<SignupForm/>}/>
        <Route path="/projects" element={<SignupForm/>}/>
        <Route path="/:project" element={<SignupForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
