import {ElementType, FC, HTMLAttributes} from 'react';

export type DivProps = {
    as?: ElementType;
    withoutFrame?: boolean;
} & HTMLAttributes<HTMLDivElement>;

export type Props = FC<DivProps>;