import { FC } from "react";
import { Application, Job } from "../../../../types/common";

interface IProps {
    vacancies: Job[]
}

export type Props = FC<IProps>;