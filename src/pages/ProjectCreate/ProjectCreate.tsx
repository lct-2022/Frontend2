import React, { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { createProject, getPopularProjects } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import {cn} from '@bem-react/classname';
import { useDispatch } from 'react-redux';
import { CurrentProjectActions } from '../../store/types/currentProject';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/routes';
import { getAuthorizedUser } from '../../api/passport';
import { getAuthorizedUserAction } from '../../store/actions/users';

import './ProjectCreate.css';
import Button from '../../components/Button';

const cName = cn('project-create');

const CREATE_TITLE = 'Создать проект';

function ProjectCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

  useEffect(() => {
    
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate()

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  } 
  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
  }
  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
}

  const createProjectBtn = useCallback(() => {
      createProject({
        title,
        description,
        url,
      }, getTokenFromCookies())
        .then(project => {
            dispatch({
              type: CurrentProjectActions.SET_PROJECT,
              payload: project,
            });
            return new Promise((res) => {
              res(dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())))
            })
        })
        .then(() => {
          navigate(`${ROUTES.PROJECT}/created`);
        })
  }, [title, description, url]);
    
  return (
    <div className={cName()}>
      <div className={cName('blocks')}>
        <div className={cName('title')}>
          <label htmlFor="title" className={cName('title-label')}>
            Название проекта
          </label>

          <input className={cName('input')} name="title" type="text" value={title} placeholder="Название проекта" onChange={changeTitle}/>
        </div>

        <div className={cName('title')}>
          <label htmlFor="description" className={cName('description-label')}>
            Описание проекта
          </label>

          <input className={cName('input')} name="description" type="text" value={description} placeholder="Описание проекта" onChange={changeDescription}/>
        </div>

        <div className={cName('title')}>
          <label htmlFor="url" className={cName('url-label')}>
            Ссылка на проект
          </label>

          <input className={cName('input')} name="url" type="text" value={url} placeholder="Ссылка на проект" onChange={changeUrl}/>
        </div>

      </div>

      <Button onClick={createProjectBtn}>
        {CREATE_TITLE}
      </Button>
    </div>

  )
}
export default ProjectCreate;