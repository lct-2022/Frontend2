import {FC, HTMLAttributes} from 'react';

export type TextProps = {
    type: 'ordinary' | 'header' | 'light' | 'vilet';
} & HTMLAttributes<HTMLParagraphElement>;

export type Props = FC<TextProps>;