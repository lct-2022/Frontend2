import { FC } from "react";
import { Job } from "../../../../types";

interface IProps {
    title: Job['title'],
    description: Job['description'],    
}

export type Props = FC<IProps>;