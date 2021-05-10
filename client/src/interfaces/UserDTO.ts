export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  idToken?: string;
  image?: string;
  lastEntry?: string;
  consecutiveDays?: number;
  posesCompletion?: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
  customTracks?: [];
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
    beginner: '0%',
    intermediate: '0%',
    advanced: '0%',
  },
};
