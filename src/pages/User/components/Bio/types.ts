import { FC } from "react";
import { User, UserData } from "../../../../types";

interface IProps {
    user: UserData;
    rating?: number
}

export type Props = FC<IProps>;