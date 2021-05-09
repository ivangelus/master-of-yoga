import {BaseRoutines} from '../interfaces/RoutineDTO';
import {AuthResponseDTO} from '../interfaces/AuthResponseDTO'

const baseUrl = 'http://127.0.0.1:8000';

export const getRoutines = async (): Promise <BaseRoutines> => {
  try {
    const routines = await fetch(`${baseUrl}/api/routines/getAll`)
    return await routines.json();
  } catch (error) {
    throw new Error(error)
  }
}

export const authUser = async (token: string): Promise <AuthResponseDTO> => {
  try {
    const user = await fetch(`${baseUrl}/api/auth/verify`, {
      method: 'POST',
      body: JSON.stringify(token),
      headers: {
        'Content-Type': 'application/json'
      }
    })
    return user.json()
  } catch (error) {
    throw new Error(error)
  }
}