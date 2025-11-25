export interface Car {
  id: string;
  year: string;
  brand: string;
  model: string;
  type: string;
  img: string;
  description: string;
  fuelConsumption: string;
  engineSize: string;
  accessories: string[];
  functionalities: string[];
  rentalPrice: string;
  rentalCompany: string;
  address: string;
  rentalConditions: string[];
  mileage: string;
}

export interface PaginatedCarsResponse {
  cars: Car[];
  totalCars: number;
  page: number;
  totalPages: number;
}
