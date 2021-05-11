import { PoseDTO, mockPoseDTO } from './PoseDTO';

export interface RoutineDTO {
  posesArr?: PoseDTO[];
}

export interface BaseRoutinesDTO {
  beginner: PoseDTO[];
  intermediate: PoseDTO[];
  advanced: PoseDTO[];
}

export const initialBaseRoutinesDTO: BaseRoutinesDTO = {
  beginner: [],
  intermediate: [],
  advanced: [],
};
