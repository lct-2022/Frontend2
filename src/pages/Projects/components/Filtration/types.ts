import { Dispatch, FC, SetStateAction } from "react";
import { Project } from "../../../../types";


interface IProps {
    projects: Project[];
    setProjects: Dispatch<SetStateAction<Project[]>>;
}

export type Props = FC<IProps>;