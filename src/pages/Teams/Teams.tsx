import React, { useMemo } from 'react';

import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { teamsSelector } from '../../store/selectors/teams';

import Button from '../../ui/Button';

import './Teams.css';

const cName = cn('teams');

const TEAMS: {title: string; id: number}[] = [
    {title: 'Team1', id: 1},
    {title: 'Team2', id: 2},
    {title: 'Team3', id: 3},
    {title: 'Team4', id: 4},
    {title: 'Team5', id: 5},
];

function Teams() {
    const teams = useSelector(teamsSelector);
    const tempTeams = teams.length ? teams : TEAMS;

    const allTeams = useMemo(() => {
        return (
            <div className={cName('list')}>
                {tempTeams.map(({title, id}) => (
                    <div key={id} className={cName('team-block')}>
                        <h4>{title}</h4>

                        <div className={cName('btns')}>
                            <Button>Кинуть приглашение</Button>
                        </div>
                    </div>
                ))}
            </div>
        )
    }, [tempTeams]);

    return (
        <div className={cName()}>
            <h1>Доступные команды</h1>

            {allTeams}
        </div>
    )
}
export default Teams;