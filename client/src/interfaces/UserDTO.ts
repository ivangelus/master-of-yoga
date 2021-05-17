import { PoseDTO } from './PoseDTO';

interface PoseCompletionDTO {
  level: 'beginner' | 'intermediate' | 'advanced';
  id: string;
  percentage: number;
}

export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  image?: string;
  lastEntry?: string;
  consecutiveDays?: number;
  customTracks?: PoseDTO[];
  posesCompletion?: PoseCompletionDTO[];
}

export const initialStateUserDTO: UserDTO = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  image: '',
  lastEntry: new Date().toISOString(),
  consecutiveDays: 0,
  customTracks: [],
  posesCompletion: [],
};
