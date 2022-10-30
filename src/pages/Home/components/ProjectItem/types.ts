import { FC } from "react";
import { IProject, ProjectData } from "../../../../types";

interface IProps {
    title: ProjectData['title'],
    description: ProjectData['description'], 
    contest: ProjectData['contests'],
    url: ProjectData['url'],
    rating: IProject['rating'],
}

export type Props = FC<IProps>;