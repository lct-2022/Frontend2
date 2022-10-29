import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';
import Home from '../Home';

import './App.css';
import { ROUTES } from '../../utils/routes';

function Main() {
  return (
    <h1>Main</h1>
  )
}

function App() {
  const isAuthorized = true;
  // useSelector(() => {});

  return (
    <BrowserRouter>
      <Routes>
        <Route path={ROUTES.INDEX} element={<Home/>}/>

        <Route path={ROUTES.SIGNUP} element={<LoginForm isAuthorized={isAuthorized}/>}/>
        <Route path={ROUTES.LOGIN} element={<LoginForm isAuthorized={isAuthorized}/>}/>
        <Route path={ROUTES.USER} element={<Profile/>}/>

        <Route path={ROUTES.PROJECTS} element={<LoginForm isAuthorized={isAuthorized}/>}/>
        <Route path={ROUTES.PROJECT} element={<LoginForm isAuthorized={isAuthorized}/>}/>

        <Route path={ROUTES.SERVICES} element={<LoginForm isAuthorized={isAuthorized}/>}/>

        <Route path={ROUTES.CHAT} element={<LoginForm isAuthorized={isAuthorized}/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
