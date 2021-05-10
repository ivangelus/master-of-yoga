import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { UserDTO } from '../interfaces/UserDTO';
import { BaseRoutinesDTO } from '../interfaces/RoutineDTO';
import { AuthResponseDTO } from '../interfaces/AuthResponseDTO';

const baseUrl: string = env.SERVER_ADDRESS;

async function getRoutines(): Promise<BaseRoutinesDTO> {
  try {
    const routines: AxiosResponse = await axios.get(
      `${baseUrl}/api/routines/getAll`
    );
    return routines.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function authUser(token: string): Promise<AuthResponseDTO> {
  try {
    const user = await axios.post(`${baseUrl}/api/users/verify`, { token });
    return user.data;
  } catch (error) {
    throw new Error(error);
  }
}

async function createUser(newUser: UserDTO): Promise<UserDTO> {
  try {
    const response: AxiosResponse = await axios.post(
      `${baseUrl}/api/users`,
      newUser
    );
    return response.data;
  } catch (error) {
    throw new Error(error);
  }
}

export { createUser, authUser, getRoutines };
