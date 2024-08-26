import { FC } from "react";
import { ProjectData } from "../../types/common";

interface IProps {
    projects: ProjectData[];
    setNewProjects: (newProjects: ProjectData[]) => void;
}

export type Props = FC<IProps>;