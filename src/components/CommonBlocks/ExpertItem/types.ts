import { FC } from "react";
import { Job, User, UserData } from "../../../types";

interface IProps {
    fio: UserData['fio'],
    job: UserData['job'], 
    id: UserData['id'], 
    rating: number;  
}

export type Props = FC<IProps>;