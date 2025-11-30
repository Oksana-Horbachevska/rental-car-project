'use client';

import Image from 'next/image';
import css from './CarDetails.module.css';
import { Car } from '@/types/car';
import { simpleFormatAddress } from '@/utils/formatAddress';
import { Formik, Form, Field, FormikHelpers } from 'formik';
import toast, { Toaster } from 'react-hot-toast';

type CarDetailsProps = {
  car: Car;
};

interface OrderFormValues {
  name: string;
  email: string;
  date: string;
  comment: string;
}

const initialValues: OrderFormValues = {
  name: '',
  email: '',
  date: '',
  comment: '',
};

const CarDetails = (car: CarDetailsProps) => {
  const handleSubmit = (
    values: OrderFormValues,
    actions: FormikHelpers<OrderFormValues>
  ) => {
    console.log('Order data:', values);
    toast.success(
      `✅ Order for ${car.car.brand} ${car.car.model} successfully submitted!`
    );
    actions.resetForm();
  };

  return (
    <>
      <Toaster />
      <div className={css.carDetailsContainer}>
        <div className={css.leftBlock}>
          <div className={css.imageWrapper}>
            <Image
              src={car.car.img}
              alt={car.car.brand}
              width={640}
              height={512}
              className={css.image}
            ></Image>
          </div>
          <div className={css.formWrapper}>
            <h2 className={css.formTitle}>Book your car now</h2>
            <p className={css.formText}>
              Stay connected! We are always ready to help you.
            </p>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
              <Form action="" className={css.bookForm}>
                <Field
                  type="text"
                  name="name"
                  className={css.formInput}
                  placeholder="Name*"
                />
                <Field
                  type="email"
                  name="email"
                  className={css.formInput}
                  placeholder="Email*"
                />
                <Field
                  type="date"
                  name="date"
                  className={css.formInput}
                  placeholder="Booking date"
                />
                <Field
                  as="textarea"
                  name="comment"
                  id="comment"
                  className={css.formTextarea}
                  placeholder="Comment"
                ></Field>
                <button type="submit" className={css.button}>
                  Send
                </button>
              </Form>
            </Formik>
          </div>
        </div>
        <div className={css.rightBlock}>
          <div className={css.generalInfo}>
            <h1 className={css.title}>
              {car.car.brand} {car.car.model}, {car.car.year}
            </h1>
            <div className={css.locationWrapper}>
              <p className={css.location}>
                <svg width="16" height="16" viewBox="0 0 32 32">
                  <use href="/icons.svg#icon-Location" />
                </svg>
                {'  '}
                {simpleFormatAddress(car.car.address)}
              </p>
              <p className={css.mileage}>Mileage:{car.car.mileage}</p>
            </div>
            <p className={css.price}>${car.car.rentalPrice}</p>
            <p className={css.description}>{car.car.description}</p>
          </div>
          <div className={css.techInfo}>
            <div className={css.block1}>
              <h2 className={css.blockTitle}>Rental Conditions: </h2>
              <ul>
                <li className={css.blockItem}>
                  {' '}
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  Minimum age : 25
                </li>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  Security deposite required{' '}
                </li>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-check-circle" />
                  </svg>
                  Valid driver’s license
                </li>
              </ul>
            </div>
            <div className={css.block2}>
              <h2 className={css.blockTitle}>Car Specifications: </h2>
              <ul>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-calendar" />
                  </svg>
                  Year:{car.car.year}
                </li>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-car" />
                  </svg>
                  Type: {car.car.type}
                </li>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-fuel-pump" />
                  </svg>
                  Fuel Consumption: {car.car.fuelConsumption}
                </li>
                <li className={css.blockItem}>
                  <svg width="16" height="16" viewBox="0 0 16 16">
                    <use href="/icons.svg#icon-gear" />
                  </svg>
                  Engine Size: {car.car.engineSize}
                </li>
              </ul>
            </div>
            <div className={css.block3}>
              <h2 className={css.blockTitle}>
                Accessories and functionalities:
              </h2>
              <ul>
                {car.car.accessories.map((accessory, index) => (
                  <li className={css.blockItem} key={index}>
                    <svg width="16" height="16" viewBox="0 0 16 16">
                      <use href="/icons.svg#icon-check-circle" />
                    </svg>
                    {accessory}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetails;
