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

export const TeamCreate: FC<Props> = ({setTeams}) => {
    const [teamTitle, setTeamTitle] = useState('');

    const changeTeamTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTeamTitle(event.target.value);
    };

    const addTeam = () => {
        setTeams(prev => [...prev, {title: teamTitle, id: Math.random()}]);
        setTeamTitle('')
    }

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

    const createNewTeam = () => {
        setIsTeamCreate(prev => !prev);
    };

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const addUserToTeam = useCallback((id: number, title: string) => {
        dispatch(setActiveTeamAction({title, id} || {title: 'Team1', id:1}));
        navigate(ROUTES.EXPERTS);
    }, [setTeams]);

    const removeTeam = (id: number) => {
        setTeams(prev => prev.filter(el => el.id !== id))
    };

    return (
        <div style={{display: 'flex', flexDirection: 'column', gap: '8px'}}>
            {teams.map(({title, id}) => (
                <div key={id} style={{display: 'flex', justifyContent: 'space-between', gap: '8px'}}>
                    {title}
                    
                    {currentUser?.admin &&
                        <div style={{display: 'flex', gap: '4px'}}>
                            <button onClick={() => addUserToTeam(id, title)} style={{cursor: 'pointer'}}>Добавить участника в команду</button>
                            <button onClick={() => removeTeam(id)} style={{cursor: 'pointer'}}>Удалить команду</button>
                        </div>
                    }
                </div>
            ))}
             
            {currentUser?.admin && <button onClick={createNewTeam}>Создать команду +</button>}

            {isTeamCreate && currentUser?.admin && <TeamCreate setTeams={setTeams}/>}  
        </div>
    )
}
export default memo(Teams);