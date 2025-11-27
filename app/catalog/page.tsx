import CarList from '@/components/CarList/CarList';
import { fetchBrandsServer, fetchCarsServer } from '@/lib/api/serverApi';

async function CatalogPage() {
  const cars = await fetchCarsServer('1', '12', '', '', '', '');
  console.log('cars:', cars.cars);
  const brands = await fetchBrandsServer();
  console.log('brands:', brands);

  return <CarList cars={cars.cars} />;
}

export default CatalogPage;
