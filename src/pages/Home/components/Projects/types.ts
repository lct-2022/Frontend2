import { FC } from "react";
import { User, Project } from "../../../../types/common";

interface IProps {
    projects: Project[];
}

export type Props = FC<IProps>;