import React, { memo, MouseEvent, useEffect, useState } from 'react';
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
import { useDispatch } from 'react-redux';
import { getAuthorizedUserAction } from '../../store/actions/users';
import { getTokenFromCookies } from '../../utils/cookie';
import { useSelector } from 'react-redux';
import Applications from '../Applications/Applications';
import { authUserSelector } from '../../store/selectors/users';
import { IBaseStore } from '../../store/types/store';
import { lsGetAuthorizedUser } from '../../utils/storage';
import EditForm from '../User/components/EditForm/EditForm';
import Spinner from '../../components/Spinner';

import './Main.css';
import { allIndustriesAction, allInnovationsAction, allStagessAction } from '../../store/actions/projects';
import CreateJob from '../CreateJob/CreateJob';

function Main() {
  const store = useSelector((store: IBaseStore) => store);
  console.log('STORE =>', store);
  const authUser = useSelector(authUserSelector);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const [isDropped, setIsDropped] = useState(false);
  
  const cancelDrop = () => {
    setIsDropped(false);
  }
  const changeDrop = (event: MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    setIsDropped(prev => !prev);
  }

  useEffect(() => {
      dispatch<any>(allIndustriesAction());
      dispatch<any>(allInnovationsAction());
      dispatch<any>(allStagessAction());

      const isUserAuthorizedInit = authUser || getTokenFromCookies() || lsGetAuthorizedUser();
      if (!isUserAuthorizedInit && location.pathname !== ROUTES.INDEX) {
        navigate(ROUTES.INDEX);
      }
      dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())); // token из кук
  }, []);

  return (  
        <div className="main" onClick={cancelDrop}>
          <Navbar changeDrop={changeDrop} isDropped={isDropped}/>
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
              <Route path={ROUTES.JOB_CREATE} element={<CreateJob/>}/>
              <Route path={ROUTES.EXPERTS} element={<Experts/>}/>
              <Route path={ROUTES.EXPERTS_SEARCH} element={<Experts/>}/>

              <Route path={ROUTES.TEAMS} element={<Teams/>}/>
              <Route path={ROUTES.APPLICATIONS} element={<Applications/>}/>

              <Route path={ROUTES.EVENTS} element={<h1>Мероприятия</h1>}/>
              <Route path={ROUTES.SERVICES} element={<h1>Сервисы</h1>}/>
            </Routes>
            {/* <Footer/> */}
        </div>
  );
}

export default Main;
