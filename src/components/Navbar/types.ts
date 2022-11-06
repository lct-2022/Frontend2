import {ElementType, FC, HTMLAttributes, MouseEvent, MouseEventHandler} from 'react';

interface IProps {
    isDropped: boolean;
    changeDrop: (event: MouseEvent<HTMLDivElement>) => void
}

export type Props = FC<IProps>;