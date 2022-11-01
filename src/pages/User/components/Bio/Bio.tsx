import React, { useMemo, useState } from 'react';
import {cn} from '@bem-react/classname';
import { prepareProfileItems } from '../../utils';
import { CHANGE_TITLE, ITEMS_MAP } from '../../consts';
import { Props } from './types';

const cName = cn('bio')

const Bio: Props = ({user}) => {
    const [editMode, setEditMode] = useState(false);

    const userBio = useMemo(() => {
        return (
             <div className={cName('data')}>
                {(Object.entries(prepareProfileItems(user))).map(([key, value]) => {
                    if (editMode) {
                        return (
                            <div>
                                <label htmlFor={cName('edit-item')}>{ITEMS_MAP[key]}</label>
                                <input className={cName('edit-item')} type="text" value={value?.toString() || ''} />
                            </div>
                        )
                    } else 
                    return (
                    <div
                        key={ITEMS_MAP[key]}
                        className={cName('item')}
                    >
                        {key}:&nbsp;{value}
                    </div>
                )})}
            </div>
        )
    }, [user]);

    return (
        <div className={cName()}>
            {userBio}

            <button className={cName('btn')}>{CHANGE_TITLE}</button>
        </div>
    )
}
export default Bio;