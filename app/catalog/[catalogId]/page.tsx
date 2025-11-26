import { fetchCarByIdServer } from '@/lib/api/serverApi';

async function CarPage() {
  const car = await fetchCarByIdServer('11a3ab35-07b8-4336-b06b-602cdc309f2c');
  console.log('carById:', car);

  return <p>CarPage</p>;
}

export default CarPage;
