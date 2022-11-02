import React from 'react';

import {cn} from '@bem-react/classname';

const cName = cn('admin-page')

function AdminPage() {
    return (
        <div className={cName()}>
            <h3>Отклики на вакансии</h3>

            {[1,2,3,4,5].map(el => <div>{el}</div>)}
        </div>
    )
}
export default AdminPage;