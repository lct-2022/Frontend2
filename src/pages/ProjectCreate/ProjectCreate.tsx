import React, { ChangeEvent, useCallback, useState } from 'react';
import { createProject, getProjects } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import {cn} from '@bem-react/classname';
import { useDispatch } from 'react-redux';
import { ActiveProjectActions } from '../../store/types/activeProject';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/routes';
import { getAuthorizedUser } from '../../api/passport';
import { getAuthorizedUserAction } from '../../store/actions/users';

const cName = cn('project-create');

const CREATE_TITLE = 'Создать проект';

function ProjectCreate() {
      //TODO Formik!!!
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');

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
              type: ActiveProjectActions.SET_PROJECT,
              payload: project,
            });
            new Promise((res) => {
              res(dispatch<any>(getAuthorizedUserAction(getTokenFromCookies())))
            })
        })
        .then(() => {
          navigate(`${ROUTES.PROJECT}/created`);
        })
  }, [title, description, url]);
    
  return (
    <div className={cName()}>
      <h1>Форма проекта</h1>
      <br/>

      <div>
        <div className={cName('title')}>
          <label htmlFor={cName('title')} className={cName('title-label')}>
            Название проекта
          </label>

          <input className={cName('title-input')} type="text" value={title} onChange={changeTitle}/>
        </div>

        <div className={cName('description')}>
          <label htmlFor={cName('description')} className={cName('description-label')}>
            Описание проекта
          </label>

          <input className={cName('description-input')} type="text" value={description} onChange={changeDescription}/>
        </div>

        <div className={cName('url')}>
          <label htmlFor={cName('url')} className={cName('url-label')}>
            Ссылка на проект
          </label>

          <input className={cName('url-input')} type="text" value={url} onChange={changeUrl}/>
        </div>

      </div>

      <button onClick={createProjectBtn}>
        {CREATE_TITLE}
      </button>
    </div>

  )
}
export default ProjectCreate;