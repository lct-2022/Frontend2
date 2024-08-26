import { FC } from "react";
import { Job, User, UserData } from "../../../types/common";

interface IProps {
    user:  User['user'];
    rating?: User['rating'];
    canBeInvited?: string 
}

export type Props = FC<IProps>;