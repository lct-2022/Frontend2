import { FC } from "react";
import { Project, ProjectData } from "../../../types/common";

interface IProps {
    title: ProjectData['title'],
    description: ProjectData['description'],
    industry: ProjectData['industry'],
    id: ProjectData['id'];
    teamSize?: ProjectData['team_size'],
    jobs? :ProjectData['jobs'];
    rating?: Project['rating'],
    additonalInfo?: string;
}

export type Props = FC<IProps>;