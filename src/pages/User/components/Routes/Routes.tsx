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
import Projects from '../../../Projects';

const cName = cn('user-routes');

const UserRoutes: Props = ({user}) => {
    const [shownData, setShowData] = useState<UserOption>('about')

    const setOptions = useCallback((point: UserOption) => {
        setShowData(point)
    }, [])    

    return (
        <div className={cName()}>        
            <UserOptions 
                curentOption={shownData}
                setOptions={setOptions}
            />

            {shownData === 'about' &&
                <About user={user}/>
            }

            {shownData === 'resume' &&
                <Resume user={user}/>
            }

            {shownData === 'projects' &&
                <Projects/>
            }

            {shownData === 'teams' &&
                <Teams/>
            }
        </div>
    )
}
export default UserRoutes;