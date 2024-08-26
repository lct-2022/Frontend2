import React, { memo } from 'react';
import { cn } from '@bem-react/classname';
import { Props } from './types';
import Card from '../../../../ui/Card';
import Text from '../../../../ui/Text';
import { HIRING, STATUSES, TAGS, TEAM_SIZES } from '../../consts';
import { useQuery } from 'react-query';
import { getIndustries, getInnovationTypes } from '../../../../api/platform';
import Spinner from '../../../../ui/Spinner';
import { handleError } from '../../../../utils/handlers';

import './Filtration.css';

const cName = cn('project-filters');

const ProjectFilters: Props = ({
    filterByIndustries,
    filterByInnivationTypes,
    filterByTags,
    filterByTeamSize,
    filterIsActive,
    filterIsNotActive,
}) => {
    const innovationTypes = useQuery('getInnovationtypes', () => getInnovationTypes());
    const industries = useQuery('getInnovationtypes', () => getIndustries());

    if (innovationTypes.isLoading || industries.isLoading) return <Spinner/>;

    handleError({
        innovationTypes,
        industries,
    });
    
    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Статус</Text>

                <div className={cName('boxes')}>
                    {STATUSES.map(el => (
                        <div key={el}>
                            <label htmlFor={el}>{el}</label>
                            <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={el === HIRING ? filterIsActive : filterIsNotActive}/>
                        </div>
                    ))}
                </div>
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Категория инноваций</Text>

                <div className={cName('boxes')}>
                    {innovationTypes.data?.map(el => (
                        <div key={el}>
                            <label htmlFor={el}>{el}</label>

                            <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterByInnivationTypes}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Индустрия</Text>
                
                <div className={cName('boxes')}>
                    {industries.data?.map(el => (
                        <div key={el}>
                            <label htmlFor={el}>{el}</label>

                            <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterByIndustries}/>
                        </div>
                    ))}
                </div>
            </div>     

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Размер команды</Text>

                <div className={cName('boxes')}>
                    {TEAM_SIZES.map(el => (
                        <div key={el}>
                            <label htmlFor={el}>{el}</label>
                            <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterByTeamSize}/>
                        </div>
                    ))}
                </div>
            </div>

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Теги</Text>

                <div className={cName('boxes')}>
                    {TAGS.map(el => (
                        <div key={el}>
                            <label htmlFor={el}>{el}</label>
                            <input name={el} value={el} className={cName('chbx')} type="checkbox" onChange={filterByTags}/>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}

export default memo(ProjectFilters);