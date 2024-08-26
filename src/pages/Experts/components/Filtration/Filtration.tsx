import React, { ChangeEvent, FC, memo } from 'react';
import { cn } from '@bem-react/classname';
import { useQuery } from 'react-query';

import Card from '../../../../ui/Card';
import Text from '../../../../ui/Text';
import { getProfessions, getSkills } from '../../../../api/platform';
import Spinner from '../../../../ui/Spinner';
import { handleError } from '../../../../utils/handlers';

import './Filtration.css';

const cName = cn('filter-experts');

type Props = {
    filterProfessions: (event: ChangeEvent<HTMLInputElement>) => void;
    filterSkills: (event: ChangeEvent<HTMLInputElement>) => void;
}

const Filtration: FC<Props> = ({filterProfessions, filterSkills}) => {
    const professions = useQuery('professions', () => getProfessions());
    const skills = useQuery('skills', () => getSkills());

    if (professions.isLoading || skills.isLoading) {
        return <Spinner/>
    }

    handleError({
        professions,
        skills,
    });

    return (
        <Card className={cName()}>
            <div className={cName('block')}>
                <Text className={cName('field-title')}>Профессии:</Text>

                <div className={cName('boxes')}>
                    {professions.data?.map(({id, title}) => (
                        <div key={id}>
                            <label htmlFor={title}>{title}</label>

                            <input name={title} value={id} className={cName('chbx')} type="checkbox" onChange={filterProfessions}/>
                        </div>
                    ))}
                </div>
            </div>   

            <div className={cName('block')}>
                <Text className={cName('field-title')}>Навыки:</Text>

                <div className={cName('boxes')}>
                    {skills.data?.map(({id, title}) => (
                        <div key={id}>
                            <label htmlFor={title}>{title}</label>

                            <input name={title} value={id} className={cName('chbx')} type="checkbox" onChange={filterSkills}/>
                        </div>
                    ))}
                </div>
            </div>
        </Card>
    )
}
export default memo(Filtration);