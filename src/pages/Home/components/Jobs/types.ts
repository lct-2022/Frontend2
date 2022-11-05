import { FC } from "react";
import { User, Job } from "../../../../types";

interface IProps {
    jobs: Job[];
}

export type Props = FC<IProps>;