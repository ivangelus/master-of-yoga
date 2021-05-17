export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password?: string;
  image?: string;
  lastEntry?: string;
  consecutiveDays?: number;
  customTracks?: [];
  posesCompletion?: {
    beginner: string;
    intermediate: string;
    advanced: string;
  };
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
  posesCompletion: {
    beginner: '0%',
    intermediate: '0%',
    advanced: '0%',
  },
};
