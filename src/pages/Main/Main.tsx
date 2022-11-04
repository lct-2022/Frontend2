import React, { memo, useEffect } from 'react';
import {BrowserRouter, Routes, Route, useLocation, useNavigate} from 'react-router-dom';

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
import { ROUTES } from '../../utils/routes';
import Navbar from '../../components/Navbar';
import ErrorBoundary from '../../components/Error-Boundary';
import { getAuthorizedUser } from '../../api/passport';
import { useDispatch } from 'react-redux';
import { getAuthorizedUserAction } from '../../store/actions/users';
import { getTokenFromCookies } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import Applications from '../Applications/Applications';
import { currentUserSelector, shownProfileSelector } from '../../store/selectors/users';
import { IBaseStore } from '../../store/types/store';
import { antiadblock } from '../../utils/antiblock';
import { lsGetAuthorizedUser } from '../../utils/storage';
import EditForm from '../User/components/EditForm/EditForm';

// antiadblock();

function Main() {
  const store = useSelector((store: IBaseStore) => store);
  console.log('STORE =>', store);
  const currentUser = useSelector(currentUserSelector);

  console.log(currentUser?.projects);
  
  
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
      const isUserAuthorizedInit = currentUser || getTokenFromCookies() || lsGetAuthorizedUser();

      if (!isUserAuthorizedInit && location.pathname !== ROUTES.INDEX) {
        navigate(ROUTES.INDEX)
      }

      dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())); // token из кук
  }, []);

  return (  
      <>
          <Navbar/>
            <Routes>
              <Route path={ROUTES.INDEX} element={<Home/>}/>

              <Route path={ROUTES.SIGNUP} element={<LoginForm type="signup"/>}/>
              <Route path={ROUTES.LOGIN} element={<LoginForm type="login"/>}/>

              <Route path={ROUTES.USER} element={<Profile/>}/>
              <Route path={ROUTES.USER_SEARCH} element={<Profile/>}/>
              <Route path={ROUTES.USER_EDIT} element={<EditForm/>}/>

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
        </>
  );
}

export default Main;
