import React, { useEffect } from 'react';
import {Routes, Route, useLocation, useNavigate} from 'react-router-dom';

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
import Navbar from '../../ui/Navbar';
import { useDispatch } from 'react-redux';
import { getTokenFromCookies } from '../../utils/cookie';
import Applications from '../Applications/Applications';
import EditForm from '../User/components/EditForm/EditForm';
import { allIndustriesAction, allInnovationsAction, allStagesAction } from '../../store/actions/projects';
import CreateJob from '../CreateJob/CreateJob';
import { getAuthorizedUser } from '../../api/passport';
import { AuthUserActions } from '../../store/types/authUser';

import './Main.css';

function Main() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        const requestAuthUser = async () => {
            const user = await getAuthorizedUser(getTokenFromCookies()); // token из кук

            if (!user && location.pathname !== ROUTES.INDEX) {
                navigate(ROUTES.INDEX);
            }

            if (user) {
                dispatch<any>({
                    type: AuthUserActions.SET_USER,
                    payload: user,
                });
            }
        }

        requestAuthUser();
        
        dispatch<any>(allIndustriesAction());
        dispatch<any>(allInnovationsAction());
        dispatch<any>(allStagesAction());
    }, []);

    return (  
        <div className="main">
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
                <Route path={ROUTES.JOB_CREATE} element={<CreateJob/>}/>
                <Route path={ROUTES.EXPERTS} element={<Experts/>}/>
                <Route path={ROUTES.EXPERTS_SEARCH} element={<Experts/>}/>

                <Route path={ROUTES.TEAMS} element={<Teams/>}/>
                <Route path={ROUTES.APPLICATIONS} element={<Applications/>}/>

                <Route path={ROUTES.EVENTS} element={<h1>Мероприятия</h1>}/>
                <Route path={ROUTES.SERVICES} element={<h1>Сервисы</h1>}/>
            </Routes>
        </div>
    );
}

export default Main;
