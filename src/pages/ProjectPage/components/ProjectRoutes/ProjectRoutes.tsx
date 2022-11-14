import React, { useCallback, useContext, useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';

import './Routes.css';
import { ProjectOption } from '../../consts';

const cName = cn('user-routes');

const ProjectRoutes: Props = ({user}) => {
    const [shownData, setShowData] = useState<ProjectOption>('stages');

    const setOptions = useCallback((point: ProjectOption) => {
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
export default ProjectRoutes;