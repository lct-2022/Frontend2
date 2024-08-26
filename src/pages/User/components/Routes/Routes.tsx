import React, { useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { UserOption } from '../../consts';
import { Props } from '../About/types';
import About from '../About';
import Resume from '../Resume';
import Teams from '../Teams/Teams';
import UserOptions from '../Options';
import Projects from '../ProjectsListProfile/ProjectsListProfile';

import './Routes.css';

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
                <Projects projects={user.projects || []}/>
            }

            {shownData === 'teams' &&
                <Teams/>
            }
        </div>
    )
}
export default UserRoutes;