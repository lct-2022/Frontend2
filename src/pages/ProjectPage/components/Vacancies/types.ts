import { FC } from "react";
import { Application, Job } from "../../../../types";

interface IProps {
    vacancies: Job[]
}

export type Props = FC<IProps>;