import React, { useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP, UserOption } from '../../consts';
import { Props } from '../About/types';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import About from '../About';
import Resume from '../Resume';
import Teams from '../Teams/Teams';
import UserOptions from '../../components/Options';
import { ROUTES } from '../../../../utils/routes';
import './Routes.css';
import Projects from '../ProjectsListProfile/ProjectsListProfile';
import { useSelector } from 'react-redux';
import ProjectsList from '../../../Projects/components/ProjectsList';

const cName = cn('user-routes');

const UserRoutes: Props = ({user}) => {
    const [shownData, setShowData] = useState<UserOption>('ideas');

    const setOptions = useCallback((point: UserOption) => {
        setShowData(point)
    }, [])    

    return (
        <div className={cName()}>        
            <UserOptions 
                currentOption={shownData}
                setOptions={setOptions}
            />

            {shownData === 'about' &&
                <About user={user}/>
            }

            {shownData === 'resume' &&
                <Resume user={user}/>
            }

            {shownData === 'ideas' &&
                // <Projects projects={user?.projects || []}/>
                <Projects projects={user.projects || []}/>
            }

            {shownData === 'teams' &&
                <Teams/>
            }
        </div>
    )
}
export default UserRoutes;