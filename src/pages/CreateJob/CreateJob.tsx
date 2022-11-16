import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import {cn} from '@bem-react/classname';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';

import { createJob, getSkills } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Text from '../../components/Text';
import { currentJobActions } from '../../store/types/currentJob';

import './CreateJob.css';

const cName = cn('project-create');

const queryClient = new QueryClient();

const CREATE_TITLE = 'Создать вакансию';
const BACK = 'Назад';

function JobCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [created, setCreated] = useState(false)
    const [skillState, setSkillState] = useState<{name: string, selected: boolean, id: number}[]>([]);

    const {data, isLoading} = useQuery('skills', () => getSkills());

    useEffect(() => {
        data && setSkillState(data.map(el => ({name: el.title, selected: false, id: el.id})));
    }, [data]);

    const changeSkills = useCallback((name: string) => {
        setSkillState(prev => prev.map(el => el.name === name ? {...el, selected: !el.selected} : el));
    }, []);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    } 
    const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const createJobBtn = useCallback(() => {
        createJob(
            Math.floor(Math.random() * (1000 - 1 + 1)) + 1,
            title,
            description, 
            getTokenFromCookies()
        )
            .then(job => {
                dispatch({
                    type: currentJobActions.SET_ACTIVE_JOB,
                    payload: job,
                });
            })
            .then(() => {
                alert('Вакансия создана!');
                setCreated(true);
            })
    }, [title, description]);

    if (isLoading) {
        return <Spinner/>;
    }
        
    return (
        <QueryClientProvider client={queryClient}>
            <div className={cName()}>
                <div className={cName('blocks')}>
                <div className={cName('title')}>
                    <label htmlFor="title" className={cName('title-label')}>
                        <Text className={cName('header')}>Название вакансии</Text>
                    </label>

                    <input className={cName('input')} name="title" type="text" value={title} placeholder="Название вакансии" onChange={changeTitle}/>
                </div>

                <div className={cName('title')}>
                    <label htmlFor="description" className={cName('description-label')}>
                        <Text className={cName('header')}>Описание вакансии</Text>
                    </label>

                    <input className={cName('input', {high: true})} name="description" type="text" value={description} placeholder="Описание вакансии" onChange={changeDescription}/>
                </div>

                <p>Укажите нужные навыки</p>
                    <div className={cName('skills')}>
                        {skillState?.map(({id, name}) => (
                            <div key={id} className={cName('skills-block')}>
                                <label htmlFor={name}>{name}</label>
                                <input name={name} value={name} className={cName('chbx')} type="checkbox" onChange={() => {changeSkills(name)}}/>
                            </div>    
                        ))}
                    </div>
                </div>
                
                {created 
                    ?
                        <Button onClick={() => navigate(-1)}>
                            {BACK}
                        </Button>
                    :
                        <Button onClick={createJobBtn}>
                            {CREATE_TITLE}
                        </Button>
                }
            </div>
        </QueryClientProvider>
    )
}
export default memo(JobCreate);