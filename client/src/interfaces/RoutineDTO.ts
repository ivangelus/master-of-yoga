import { PoseDTO } from './PoseDTO';

export interface RoutineDTO {
  posesArr?: PoseDTO[];
}

interface intersectionRoutines {
  [key: string]: PoseDTO;
}

export type BaseRoutinesDTO = intersectionRoutines & {
  begginer?: PoseDTO[];
  intermediate?: PoseDTO[];
  advanced?: PoseDTO[];
}

// export interface BaseRoutinesDTO {
//   [index: string]: any;
//   begginer?: PoseDTO[];
//   intermediate?: PoseDTO[];
//   advanced?: PoseDTO[];
// }
