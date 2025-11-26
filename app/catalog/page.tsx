import { fetchBrandsServer, fetchCarsServer } from '@/lib/api/serverApi';

async function CatalogPage() {
  const cars = await fetchCarsServer('1', '12', '', '', '', '');
  console.log(cars);
  const brands = await fetchBrandsServer();
  console.log('brands:', brands);

  return <p>Catalog Page</p>;
}

export default CatalogPage;
