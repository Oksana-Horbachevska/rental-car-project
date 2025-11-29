import { fetchCarByIdServer } from '@/lib/api/serverApi';

import type { Metadata } from 'next';

import CarDetails from '@/components/CarDetails/CarDetails';
import css from './CarPage.module.css';
type Props = {
  params: Promise<{ id: string }>;
};
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const car = await fetchCarByIdServer(id);
  return {
    title: `Car: ${car.brand}`,
    description: car.description.slice(0, 30),
    openGraph: {
      title: `Car: ${car.brand}`,
      description: car.description.slice(0, 100),
      url: `http://localhost:3000/catalog/${id}`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Note: ${car.brand}`,
        },
      ],
    },
  };
}

async function CarPage({ params }: Props) {
  const { id } = await params;
  const car = await fetchCarByIdServer(id);
  console.log('car:', car);

  return (
    <div className={`container ${css.pageContainer}`}>
      <CarDetails car={car} />
    </div>
  );
}

export default CarPage;
