import { FC } from "react";
import { IJob } from "../../../../types";

interface IProps {
    title: IJob['title'],
    description: IJob['description'],    
}

export type Props = FC<IProps>;