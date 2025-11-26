import { Car, PaginatedCarsResponse } from '@/types/car';
import { nextServer } from './api';
import { BrandsResponse } from '@/types/brand';

export async function fetchCarsServer(
  page: string,
  limit: string,
  brand: string | null,
  rentalPrice: string | null,
  minMileage: string | null,
  maxMileage: string | null
) {
  const response = await nextServer.get<PaginatedCarsResponse>('/cars', {
    params: {
      page,
      limit,
      brand: brand || undefined,
      rentalPrice: rentalPrice || undefined,
      minMileage: minMileage || undefined,
      maxMileage: maxMileage || undefined,
    },
  });
  return response.data;
}

export async function fetchCarByIdServer(id: string) {
  const response = await nextServer.get<Car>(`/cars/${id}`);
  return response.data;
}

export async function fetchBrandsServer() {
  const response = await nextServer.get<BrandsResponse>('/brands');
  return response.data;
}
