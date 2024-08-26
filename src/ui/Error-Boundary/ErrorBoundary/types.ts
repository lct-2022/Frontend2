import {ReactNode, ErrorInfo} from 'react';

import {Nullable} from '../../../types/common';

interface IState {
    error: Nullable<Error>;
    errorInfo: Nullable<ErrorInfo>;
}

export type State = Readonly<IState>;

export interface Props {
    children: ReactNode;
}
