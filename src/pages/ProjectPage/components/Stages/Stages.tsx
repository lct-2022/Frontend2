import React, {FC, memo, useMemo} from 'react';
import {cn} from '@bem-react/classname';

import Text from '../../../../ui/Text';
import { useSelector } from 'react-redux';
import { currentProjectStagesSelector } from '../../../../store/selectors/projects';

import './Stages.css';

const doneIcon = require('../../../../assets/done.svg').default;
const undoneIcon = require('../../../../assets/undone.svg').default;

const cName = cn('project-stages');

interface IProps {
    stagesIds: number[];
    description: string;
}

const Stages: FC<IProps> = ({stagesIds, description}) => {
    const allStages = useSelector(currentProjectStagesSelector);
    
    const stagesMemo = useMemo(() => {
        if (!allStages || !allStages.length) {
            return null;
        }

        return (
            <ul className={cName('stages')}>
                {allStages?.map(({title, description, id}) => {
                    return (
                        <div key={id} className={cName('stage')}>
                            <div className={cName('stage-title')}>
                                <Text>{title}</Text>
                            </div>

                            <div className={cName('substages')}>
                                {description.split('\n').map((elem, index) => {
                                    if (stagesIds.includes(id)) {
                                        return (
                                            <div className={cName('block')} key={index}>
                                                <img src={doneIcon} alt="" className={cName('icon-done')}/>

                                                <div className={cName('text-done')}>
                                                    {elem.slice(1)}
                                                </div>
                                            </div>
                                        )
                                    } else {
                                        return (
                                            <div className={cName('block')} key={index}>
                                                <img src={undoneIcon} alt="" className={cName('icon-undone')}/>

                                                <div className={cName('text-undone')}>
                                                    {elem.slice(1)}
                                                </div>
                                            </div>
                                        )
                                    }
                                })}
                            </div>
                        </div>
                    )
                })}
            </ul>
        )
    }, [stagesIds, allStages]);

    return (
       <div className={cName()}>
           <Text>{description}</Text>

           {stagesMemo}
       </div>
    )
}

export default memo(Stages);
