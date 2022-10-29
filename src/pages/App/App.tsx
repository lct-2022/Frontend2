import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import SignupForm from '../Signup';
import Profile from '../Profile';

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
        <Route path="/" element={<Main/>}/>

        <Route path="/signup" element={<SignupForm/>}/>
        <Route path="/login" element={<SignupForm/>}/>
        <Route path="/prifile" element={<Profile/>}/>

        <Route path="/:user" element={<SignupForm/>}/>
        <Route path="/projects" element={<SignupForm/>}/>
        <Route path="/:project" element={<SignupForm/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
