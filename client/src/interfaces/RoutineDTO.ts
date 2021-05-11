import { PoseDTO } from './PoseDTO';

export interface RoutineDTO {
  posesArr?: PoseDTO[];
}

export interface BaseRoutinesDTO {
  descriptions: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  beginner: PoseDTO[];
  intermediate: PoseDTO[];
  advanced: PoseDTO[];
}

export const initialBaseRoutinesDTO: BaseRoutinesDTO = {
  descriptions: {
    beginner: '',
    intermediate: '',
    advanced: '',
  },
  beginner: [],
  intermediate: [],
  advanced: [],
};
