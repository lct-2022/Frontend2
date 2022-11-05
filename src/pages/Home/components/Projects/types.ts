import { FC } from "react";
import { User, Project } from "../../../../types";

interface IProps {
    projects: Project[];
}

export type Props = FC<IProps>;