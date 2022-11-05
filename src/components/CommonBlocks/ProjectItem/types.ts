import { FC } from "react";
import { Project, ProjectData } from "../../../types";

interface IProps {
    title: ProjectData['title'],
    description: ProjectData['description'],
    industry: ProjectData['industry'],
    teamSize: ProjectData['team_size'],
    id: ProjectData['id'];
    jobs? :ProjectData['jobs'];
    rating?: Project['rating'],
    additonalInfo?: string;
}

export type Props = FC<IProps>;