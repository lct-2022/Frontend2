import { FC } from "react";
import { Job, User } from "../../../types";

interface IProps {
    fio: User['user']['fio'],
    job: User['user']['job'], 
    id: User['user']['id'],   
}

export type Props = FC<IProps>;