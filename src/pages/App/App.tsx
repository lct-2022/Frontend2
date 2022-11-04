import React, { memo, useEffect } from 'react';
import {BrowserRouter, Routes, Route, useLocation} from 'react-router-dom';

import LoginForm from '../Login';
import Profile from '../User';
import Home from '../Home';
import ProjectCreate from '../ProjectCreate';
import Projects from '../Projects';
import ProjectPage from '../ProjectPage';
import Jobs from '../Jobs';
import JobPage from '../JobPage';
import Experts from '../Experts';
import Teams from '../Teams/Teams';

import './App.css';
import { ROUTES } from '../../utils/routes';
import Navbar from '../../components/Navbar';
import ErrorBoundary from '../../components/Error-Boundary';
import { authorize } from '../../api/passport';
import { useDispatch } from 'react-redux';
import { authorizeAction } from '../../store/actions/users';
import { getTokenFromCookies } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import Applications from '../Applications/Applications';
import { currentUserSelector, shownProfileSelector } from '../../store/selectors/users';
import { IBaseStore } from '../../store/types/store';

function App() {
  const store = useSelector((store: IBaseStore) => store);
  console.log('STORE =>', store);
  
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch<any>(authorizeAction(getTokenFromCookies())); // token из кук
  }, []);

  return (  
    <ErrorBoundary>
      <BrowserRouter>
          <Navbar/>
            <Routes>
              <Route path={ROUTES.INDEX} element={<Home/>}/>

              <Route path={ROUTES.SIGNUP} element={<LoginForm type="signup"/>}/>
              <Route path={ROUTES.LOGIN} element={<LoginForm type="login"/>}/>

              <Route path={ROUTES.USER} element={<Profile/>}/>
              <Route path={ROUTES.USER_SEARCH} element={<Profile/>}/>
              <Route path={ROUTES.PROJECT_CREATE} element={<ProjectCreate/>}/>
              <Route path={ROUTES.PROJECTS} element={<Projects/>}/>
              <Route path={ROUTES.PROJECT} element={<ProjectPage/>}/>
              <Route path={ROUTES.PROJECT_CREATED} element={<ProjectPage/>}/>
              <Route path={ROUTES.JOBS} element={<Jobs/>}/>
              <Route path={ROUTES.JOB} element={<JobPage/>}/>
              <Route path={ROUTES.EXPERTS} element={<Experts/>}/>
              <Route path={ROUTES.EXPERTS_SEARCH} element={<Experts/>}/>

              <Route path={ROUTES.TEAMS} element={<Teams/>}/>
              <Route path={ROUTES.APPLICATIONS} element={<Applications/>}/>

              <Route path={ROUTES.EVENTS} element={<h1>Мероприятия</h1>}/>
              <Route path={ROUTES.SERVICES} element={<h1>Сервисы</h1>}/>
            </Routes>

          {/* <Footer/> */}
        </BrowserRouter>
     </ErrorBoundary>
  );
}

export default App;
