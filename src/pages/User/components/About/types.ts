import { FC } from "react";
import { User } from "../../../../types";

interface IProps {
    user: User['user'];
}

export type Props = FC<IProps>;