import React, { ChangeEvent, memo, useCallback, useState } from 'react';
import {cn} from '@bem-react/classname';

import { createJob } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router';
import Button from '../../ui/Button';
import Text from '../../ui/Text';
import { currentJobActions } from '../../store/types/currentJob';
import Skills from '../../ui/Skills/Skills';

import './CreateJob.css';

const cName = cn('project-create');

const CREATE_TITLE = 'Создать вакансию';
const BACK = 'Назад';

function JobCreate() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [created, setCreated] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.target.value)
    } 
    const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
    }

    const handleCreateJob = useCallback(() => {
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
        
    return (
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

                <Skills title="Укажите нужные навыки"/>
            </div>
                
            {created 
                ?
                    <Button onClick={() => navigate(-1)}>
                        {BACK}
                    </Button>
                :
                    <Button onClick={handleCreateJob}>
                        {CREATE_TITLE}
                    </Button>
            }
        </div>
    )
}

export default memo(JobCreate);