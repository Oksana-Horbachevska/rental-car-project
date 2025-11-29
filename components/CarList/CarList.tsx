import { Car } from '@/types/car';
import css from './CarList.module.css';
import Image from 'next/image';
import Link from 'next/link';
import Separator from '../Separator/Separator';
import { formatAddress } from '@/utils/formatAddress';

interface CarListProps {
  cars: Car[];
}

const CarList = ({ cars }: CarListProps) => {
  if (!cars || cars.length === 0) return null;

  return (
    <div className={css.section}>
      <ul className={css.carList}>
        {cars.map(car => (
          <li className={css.carItem} key={car.id}>
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
        ))}
      </ul>
    </div>
  );
};
export default CarList;
