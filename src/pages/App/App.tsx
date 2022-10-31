import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';
import Home from '../Home';
import Application from '../Application';
import ProjectCreate from '../ProjectCreate';
import Projects from '../Projects';

import './App.css';
import { ROUTES } from '../../utils/routes';
import Navbar from '../../components/Navbar';
import ErrorBoundary from '../../components/Error-Boundary';
import { checkAuthorization } from '../../api/passport';
import { useDispatch } from 'react-redux';
import { isUserAuthorizedAction } from '../../store/actions/activeUser';
import { getTokenFromCookies } from '../../utils/cookie';

// import React from 'react';
// function Main() {
//     return (
//         <div>
//             <h1>Main</h1>

//         </div>
//     )
// }
// export default Main;


function App() {
  const dispatch = useDispatch();
  console.log('render');
  
  useEffect(() => {
    dispatch<any>(isUserAuthorizedAction(getTokenFromCookies())); // token из кук
  }, []);

  return (
    <BrowserRouter>
      <Navbar/>
      
      <Routes>
        <Route path={ROUTES.INDEX} element={<Home/>}/>

        <Route path={ROUTES.SIGNUP} element={<LoginForm type="signup"/>}/>
        <Route path={ROUTES.LOGIN} element={<LoginForm type="login"/>}/>

        <Route path={ROUTES.USER} element={<Profile/>}/>
        <Route path={ROUTES.APPLICATION} element={<Application/>}/>
        <Route path={ROUTES.PROJECT} element={<ProjectCreate/>}/>

        <Route path={ROUTES.PROJECTS} element={<Projects/>}/>
        <Route path={ROUTES.PROJECT} element={<LoginForm/>}/>

        <Route path={ROUTES.SERVICES} element={<LoginForm/>}/>

        <Route path={ROUTES.CHAT} element={<LoginForm/>}/>
      </Routes>

      {/* <Footer/> */}
    </BrowserRouter>
  );
}

export default App;
