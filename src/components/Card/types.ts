import {ElementType, FC, HTMLAttributes} from 'react';

export type DivProps = {
    as?: ElementType;
    withFrame?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type Props = FC<DivProps>;