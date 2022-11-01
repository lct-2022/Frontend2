import { FC } from "react";
import { Project } from "../../types";

interface IProps {
    projects: Project[];
}

export type Props = FC<IProps>;