import {FC, HTMLAttributes} from 'react';

type Text = 
    | 'ordinary' 
    | 'header' 
    | 'light' 
    | 'violet'
    | 'wrapped'
    | 'large'

export type TextProps = {
    type?: Text;
} & HTMLAttributes<HTMLParagraphElement>;

export type Props = FC<TextProps>;