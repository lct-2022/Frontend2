import {FC, HTMLAttributes} from 'react';

type TextType = 
    | 'ordinary' 
    | 'header' 
    | 'light' 
    | 'violet'
    | 'wrapped'
    | 'large'
    | 'bold'

export type TextProps = {
    type?: TextType;
} & HTMLAttributes<HTMLParagraphElement>;

export type Props = FC<TextProps>;