'use client';

import { Car, PaginatedCarsResponse } from '@/types/car';
import { nextServer } from './api';
import { BrandsResponse } from '@/types/brand';

export async function fetchCarsClient(
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

export async function fetchCarByIdClient(id: string) {
  const response = await nextServer.get<Car>(`/cars/${id}`);
  return response.data;
}

export async function fetchBrandsClient() {
  const response = await nextServer.get<BrandsResponse>('/brands');
  return response.data;
}
