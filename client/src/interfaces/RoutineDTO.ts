import { PoseDTO } from './PoseDTO'

export interface RoutineDTO {
  posesArr?: PoseDTO[];
}

export interface BaseRoutinesDTO {
  begginer?: PoseDTO[];
  intermediate?: PoseDTO[];
  advanced?: PoseDTO[];
}