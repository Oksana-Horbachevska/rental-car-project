import { PaginatedCarsResponse } from '@/types/car';
import { nextServer } from './api';

export async function fetchServerCars() {
  const options = {};
  const response = await nextServer.get<PaginatedCarsResponse>(
    '/cars',
    options
  );
  return response.data;
}
