import {ButtonHTMLAttributes, ElementType, FC} from 'react';

export type ButtonProps = {
    as?: ElementType;
    type?: 'primary' | 'secondary';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = FC<ButtonProps>;