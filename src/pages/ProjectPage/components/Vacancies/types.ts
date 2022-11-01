import { FC } from "react";
import { Application } from "../../../../types";

interface IProps {
    vacancies: Application[]
}

export type Props = FC<IProps>;