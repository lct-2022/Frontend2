import { FC } from "react";
import { User, UserData } from "../../../../types/common";

interface IProps {
    user: UserData;
    rating?: number | null;
}

export type Props = FC<IProps>;