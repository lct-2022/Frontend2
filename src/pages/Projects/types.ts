import { FC } from "react";
import { Project, ProjectData } from "../../types";

interface IProps {
    projects: ProjectData[];
}

export type Props = FC<IProps>;