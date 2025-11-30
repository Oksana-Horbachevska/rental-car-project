import { Car } from '@/types/car';
import css from './CarList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Separator from '../Separator/Separator';
import { formatAddress } from '@/utils/formatAddress';
import { useCarStore } from '@/lib/stores/carStore';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  if (!cars || cars.length === 0) return null;
  const favorites = useCarStore(s => s.favorites);
  const toggleFavorite = useCarStore(s => s.toggleFavorite);

  return (
    <div className={css.section}>
      <ul className={css.carList}>
        {cars.map(car => {
          const isFavorite = favorites.some(fav => fav.id === car.id);
          return (
            <li className={css.carItem} key={car.id}>
              <button
                type="button"
                className={css.favoriteButton}
                onClick={() => toggleFavorite(car)}
              >
                <svg
                  className={`${css.favoriteIcon} ${isFavorite ? css.active : ''}`}
                  viewBox="0 0 34 32"
                >
                  <use href="/icons.svg#icon-Vector"></use>
                </svg>
              </button>
              <Image
                src={car.img}
                alt={car.brand}
                width={276}
                height={268}
                className={css.image}
              />
              <div className={css.infoBlock_1}>
                <p className={css.brandBlock}>
                  {car.brand} <span className={css.model}>{car.model}</span>,{' '}
                  {car.year}
                </p>
                <p className={css.rentalPrice}>${car.rentalPrice}</p>
              </div>
              <div className={css.infoBlock_2}>
                <p className={css.address}>
                  {formatAddress(car.address)} <Separator /> {car.rentalCompany}{' '}
                  <Separator />
                  <br />
                  {car.type} <Separator /> {car.mileage}
                </p>
              </div>
              <Link href={`/catalog/${car.id}`} className={css.button}>
                Read more
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
export default CarList;
