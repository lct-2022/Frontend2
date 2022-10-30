import {FC} from 'react';
import { IUser } from '../../../../types';

interface IProps {
    data: IUser;
}

export type Props = FC<IProps>