import {ButtonHTMLAttributes, ElementType, FC} from 'react';

export type ButtonProps = {
    as?: ElementType;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type Props = FC<ButtonProps>;