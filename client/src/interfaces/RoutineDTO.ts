import { Pose } from './PoseDTO'

export interface Routine {
  posesArr?: Pose[];
}

export interface BaseRoutines {
  begginer?: Pose[];
  intermediate?: Pose[];
  advanced?: Pose[];
}