import { Dispatch, FC, SetStateAction } from "react";
import { Project, ProjectData } from "../../../../types";


interface IProps {
    projects: ProjectData[];
    setProjects: Dispatch<SetStateAction<ProjectData[]>>;
}

export type Props = FC<IProps>;