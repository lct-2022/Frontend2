import { ProjectStage } from "../types/common"

export const getCompleteStages = (stages: ProjectStage[], stage: number):ProjectStage[] => {
    return stages.filter(el => el.id <= stage);
}