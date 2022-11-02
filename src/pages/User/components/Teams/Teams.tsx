import {cn} from '@bem-react/classname';
import { ChangeEvent, Dispatch, FC, memo, SetStateAction, useCallback, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router';
import { createTeam } from '../../../../api/platform';
import { setActiveTeamAction } from '../../../../store/actions/teams';
import { currentUserSelector } from '../../../../store/selectors/users';
import { ROUTES } from '../../../../utils/routes';

const cName = cn('teams');

type Props = {
    setTeams: Dispatch<SetStateAction<{title: string; id: number}[]>>
    team?: {title: string, id: number}
}

const TeamCreate: FC<Props> = ({setTeams}) => {
    const [teamTitle, setTeamTitle] = useState('');

    const changeTeamTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTeamTitle(event.target.value);
    };

    const addTeam = useCallback(() => {
        setTeams(prev => [...prev, {title: teamTitle, id: Math.random()}])
    }, [setTeams]);

    return (
        <div>
            <input type="text" value={teamTitle} onChange={changeTeamTitle}/>

            <button onClick={addTeam}>Добавить</button>
        </div>
    )
}

const TeamChange: FC<Props> = ({setTeams, team}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch();


    const addUserToTeam = useCallback(() => {
        dispatch(setActiveTeamAction(team || {title: 'Team1', id:1}));
        navigate(ROUTES.EXPERTS);
    }, [setTeams]);

    const removeTeam = useCallback(() => {
        setTeams(prev => prev.filter(el => el.id !== team?.id))
    }, [setTeams]);

    return (
        <div>
            <p onClick={addUserToTeam}>Добавить участника в команду</p>
            <p onClick={removeTeam}>Удалить команду</p>
        </div>
    )
}

const TEAMS: {title: string; id: number}[] = [
    {title: 'Team1', id:1},
    {title: 'Team2', id:2},
    {title: 'Team3', id:3},
    {title: 'Team4', id:4},
    {title: 'Team5', id:5},
];

function Teams() {
    const [teams, setTeams] = useState<{title: string; id: number}[]>(TEAMS);
    const currentUser = useSelector(currentUserSelector);
    
    const [isTeamCreate, setIsTeamCreate] = useState(false);
    const [isShowSettings, setIsShowSettings] = useState(false);

    const createNewTeam = () => {
        setIsTeamCreate(prev => !prev);
    };

    const showAdminSettings = useCallback(() => {
        if (!currentUser?.admin) {
            return;
        }
        setIsShowSettings(true);
    }, [currentUser?.admin]);

    const hideAdminSettings = useCallback(() => {
        if (!currentUser?.admin) {
            return;
        }
        setIsShowSettings(false);
    }, [currentUser?.admin]);

    return (
        <div>
            {teams.map(({title, id}) => (
                <div key={id} style={{display: 'flex', justifyContent: 'space-between'}}>
                    {title}
                    
                    {currentUser?.admin &&
                        <div
                            onMouseEnter={showAdminSettings}
                            onMouseLeave={hideAdminSettings}
                        >
                            Settings
                        </div>
                    }

                    {isShowSettings && currentUser?.admin && <TeamChange setTeams={setTeams} team={{title, id}}/>}
                </div>
            ))}
             
            {currentUser?.admin && <button onClick={createNewTeam}>Создать команду +</button>}

            {isTeamCreate && currentUser?.admin && <TeamCreate setTeams={setTeams}/>}  
        </div>
    )
}
export default memo(Teams);