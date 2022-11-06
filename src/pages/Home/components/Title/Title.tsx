import React, { FC, memo, useMemo } from 'react';

import { CARD_TITLES, TITLE } from './consts';
import {cn} from '@bem-react/classname';

import './Title.css';
import { IStats } from '../../../../types';
import Card from '../../../../components/Card';

const cName = cn('title-home-page');

interface IProps {
    stats: IStats;
}

const TitleHomePage: FC<IProps> = ({stats}) => {
    const cards = useMemo(() => {
        return (
            <div className={cName('container')}>
                {Object.entries(stats).map(([key, value], index) => (
                    <Card key={index} className={cName('card')}>
                        <div className={cName('val')}>{value}</div>
                        
                        <div className={cName('item')}>{CARD_TITLES[key as keyof IStats]}</div>
                    </Card>
                ))}
            </div>
        )
    }, [stats]);

    if (!stats) {
        return null;
    }

    return (
        <div className={cName()}>
            <h3 className={cName('title')}>{TITLE}</h3>

            {cards}
        </div>
    )
}

export default memo(TitleHomePage);