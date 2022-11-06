import React, { ChangeEvent, memo, useCallback, useEffect, useState } from 'react';
import {QueryClient, QueryClientProvider, useQuery} from 'react-query';
import { createProject, getIndustries, getInnovationTypes, getPopularProjects } from '../../api/platform';
import { getTokenFromCookies } from '../../utils/cookie';
import {cn} from '@bem-react/classname';
import { useDispatch, useSelector } from 'react-redux';
import { CurrentProjectActions } from '../../store/types/currentProject';
import { useNavigate } from 'react-router';
import { ROUTES } from '../../utils/routes';
import { getAuthorizedUser } from '../../api/passport';
import { getAuthorizedUserAction } from '../../store/actions/users';

import './ProjectCreate.css';
import Button from '../../components/Button';
import Spinner from '../../components/Spinner';
import Text from '../../components/Text';
import { industriesSelector, innovationsSelector } from '../../store/selectors/projects';

const cName = cn('project-create');

const queryClient = new QueryClient();

const CREATE_TITLE = 'Создать проект';

function ProjectCreate() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [url, setUrl] = useState('');
  const [industriesState, setIndustriesState] = useState<{name: string, selected: boolean}[]>([]);
  const [innovationsState, setInnovationsState] = useState<{name: string, selected: boolean}[]>([]);

  const industries = useSelector(industriesSelector);
  const innovations = useSelector(innovationsSelector);

  useEffect(() => {
    industries && setIndustriesState(industries.map(el => ({name: el, selected: false})));
    innovations && setIndustriesState(innovations.map(el => ({name: el, selected: false})));
  }, [industries, innovations]);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeTitle = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  } 
  const changeDescription = (event: ChangeEvent<HTMLInputElement>) => {
        setDescription(event.target.value)
  }
  const changeUrl = (event: ChangeEvent<HTMLInputElement>) => {
    setUrl(event.target.value)
  }

  const changeIndustries = useCallback((name: string) => {
    setIndustriesState(prev => prev.map(el => el.name === name ? {...el, selected: !el.selected} : el));
  }, []);
  const changeInnovations = useCallback((name: string) => {
    setInnovationsState(prev => prev.map(el => el.name === name ? {...el, selected: !el.selected} : el));
  }, []);

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
    <QueryClientProvider client={queryClient}>
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

          <div className={cName('checkboxes')}>
            <div className={cName('innovations')}>
              <Text>Тип инновации</Text>
              {innovations?.map(el => (
                  <div key={el}>
                    <label htmlFor={el}>{el}</label>
                    <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={() => {changeInnovations(el)}}/>
                </div>
              ))}
            </div>
            <div className={cName('industries')}>
              <Text>Индустрия</Text>
                {industries?.map(el => (
                    <div key={el}>
                        <label htmlFor={el}>{el}</label>
                        <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={() => {changeIndustries(el)}}/>
                    </div>
                ))}
            </div>
          </div>
        </div>

        <Button onClick={createProjectBtn}>
          {CREATE_TITLE}
        </Button>
      </div>
    </QueryClientProvider>
  )
}
export default memo(ProjectCreate);