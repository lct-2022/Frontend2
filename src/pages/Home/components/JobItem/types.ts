import { FC } from "react";
import { Job } from "../../../../types";

interface IProps {
    title: Job['title'],
    description: Job['description'], 
    id: Job['id'],   
}

export type Props = FC<IProps>;