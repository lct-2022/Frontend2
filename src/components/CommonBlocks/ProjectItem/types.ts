import { FC } from "react";
import { Project, ProjectData } from "../../../types";

interface IProps {
    title: ProjectData['title'],
    description: ProjectData['description'], 
    contest: ProjectData['contests'],
    url: ProjectData['url'],
    rating: Project['rating'],
    id: ProjectData['id'],
    author_id?: ProjectData['author-id'],
}

export type Props = FC<IProps>;