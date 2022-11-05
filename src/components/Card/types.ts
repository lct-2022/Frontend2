import {ElementType, FC, HTMLAttributes} from 'react';

export type DivProps = {
    as?: ElementType;
} & HTMLAttributes<HTMLDivElement>;

export type Props = FC<DivProps>;