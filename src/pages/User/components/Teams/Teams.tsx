import {cn} from '@bem-react/classname';
import { ChangeEvent, Dispatch, FC, SetStateAction, useState } from 'react';

const cName = cn('teams');

type Props = {
    setTeams: Dispatch<SetStateAction<{title: string; id: number}[]>>
}

const TeamCreate: FC<Props> = ({setTeams}) => {
    const [teamTitle, setTeamTitle] = useState('');

    const changeTeamTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTeamTitle(event.target.value);
    }
    return (
        <div>
            <input type="text" value={teamTitle} onChange={changeTeamTitle}/>
            <button onClick={() => setTeams(prev => [...prev, {title: teamTitle, id: Math.random()}])}>Добавить</button>
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

    const [isTeamCreate, setisTeamCreate] = useState(false);

    return (
        <div>
            {teams.map(({title, id}) => (
                <div key={id}>{title}</div>
            ))} 

            <button onClick={() => setisTeamCreate(prev => !prev)}>Создать команду</button>

            {isTeamCreate && <TeamCreate setTeams={setTeams}/>}  
        </div>
    )
}
export default Teams;