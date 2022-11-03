
import React from 'react';

import {cn} from '@bem-react/classname';
import { useSelector } from 'react-redux';
import { applicationsSelector } from '../../store/selectors/applications';
import Application from '../../components/CommonBlocks/Application/Application';
const cName = cn('applications');

type Props = {

}

function Applications() {
    const applications = useSelector(applicationsSelector);

    return (
        <div className={cName()}>
            {/* <h3></h3> */}

            {/* {applications.map(appl => <Application/>)} */}

        </div>
    )
}
export default Applications;