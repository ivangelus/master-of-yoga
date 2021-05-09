import {BaseRoutines} from '../interfaces/RoutineDTO';

const baseUrl = 'http://127.0.0.1:8000/';

export const getRoutines = async (): Promise <BaseRoutines> => {
  try {
    const routines = await fetch(`${baseUrl}/api/routines/getAll`)
    return await routines.json();
  } catch (error) {
    throw new Error(error)
  }
}
