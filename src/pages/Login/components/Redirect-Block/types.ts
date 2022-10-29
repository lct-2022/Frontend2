import { FC } from "react";

interface IProps {
    type: 'login' | 'signup';
}

export type Props = FC<IProps>;