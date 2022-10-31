import { FC } from "react";
import { IProject } from "../../types";

interface IProps {
    projects: IProject[];
}

export type Props = FC<IProps>;