import { Dispatch, FC, SetStateAction } from "react";
import { IProject } from "../../../../types";


interface IProps {
    projects: IProject[];
    setProjects: Dispatch<SetStateAction<IProject[]>>;
}

export type Props = FC<IProps>;