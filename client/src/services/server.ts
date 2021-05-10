import env from 'react-dotenv';
import axios, { AxiosResponse } from 'axios';
import { UserDTO } from '../interfaces/UserDTO';

const server: string = env.SERVER_ADDRESS;

async function createUser(newUser: UserDTO): Promise<UserDTO> {
  try {
    const response: AxiosResponse = await axios.post(
      `${server}/users`,
      newUser
    );
    return response.data;
  } catch (error) {
    return error;
  }
}

export { createUser };
