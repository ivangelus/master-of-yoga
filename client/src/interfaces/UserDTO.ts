export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  idToken?: string;
  image?: string;
  lastEntry?: string;
  consecutiveDays?: number;
  customTracks?: [];
  posesCompletion?: {
    beginner: number;
    intermediate: number;
    advanced: number;
  };
}

export const initialStateUserDTO = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  idToken: '',
  image: '',
  lastEntry: new Date().toISOString(),
  consecutiveDays: 0,
  customTracks: [],
  posesCompletion: {
    beginner: 0,
    intermediate: 0,
    advanced: 0,
  },
};
