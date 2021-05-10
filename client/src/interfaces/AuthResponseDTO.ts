import {UserDTO} from './UserDTO'

export interface AuthResponseDTO {
  valid?: boolean;
  msg?: string;
  result?: UserDTO;
}