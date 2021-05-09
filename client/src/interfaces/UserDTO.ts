export interface UserDTO {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  image?: string;
  lastEntry?: string;
  consecutiveDays?: number;
}

export const initialStateUserDTO = {
  firstName: '',
  lastName: '',
  email: '',
  password: '',
  image: '',
  lastEntry: new Date().toISOString(),
  consecutiveDays: 0,
};
