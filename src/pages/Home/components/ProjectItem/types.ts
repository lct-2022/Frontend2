import { FC } from "react";
import { IProject } from "../../../../types";

interface IProps {
    title: IProject['project']['title'],
    description: IProject['project']['description'], 
    contest: IProject['project']['contests'],
    url: IProject['project']['url'],
    rating: IProject['rating'],
}

export type Props = FC<IProps>;