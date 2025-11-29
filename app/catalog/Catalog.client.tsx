'use client';

import CarList from '@/components/CarList/CarList';
import { fetchBrandsClient, fetchCarsClient } from '@/lib/api/clientApi';
import { useQuery } from '@tanstack/react-query';
import css from './Catalog.module.css';

const CatalogClient = async () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['cars'],
    queryFn: async () => {
      const data = await fetchCarsClient('1', '12', '', '', '', '');
      return data;
    },
    refetchOnMount: false,
  });

  if (isLoading) return 'Is loading, please wait...';
  if (error || !data) return 'Some error is happened';

  return (
    <div className={`container ${css.pageContainer}`}>
      <div className={css.filterSection}>
        <label htmlFor="Car_brand" className={css.label}>
          Car brand
          <div className={css.selectWrapper}>
            <select name="filter" className={css.select}>
              <option
                value=""
                disabled
                selected
                hidden
                className={css.optionPlaceholder}
              >
                Choose a brand
              </option>
              <option value="brand1" className={css.option}>
                brand1
              </option>
              <option value="brand2">brand2</option>
            </select>
          </div>
        </label>
        <label htmlFor="Price" className={css.label}>
          Price/ 1 hour
          <div className={css.selectWrapper}>
            <select name="filter" className={css.select}>
              <option
                value=""
                disabled
                selected
                hidden
                className={css.optionPlaceholder}
              >
                Choose a price
              </option>
              <option value="brand1" className={css.option}>
                brand1
              </option>
              <option value="brand2">brand2</option>
            </select>
          </div>
        </label>
        <label htmlFor="Car_mileage" className={css.label}>
          Сar mileage / km
          <div className={css.inputWrapper}>
            <input
              type="text"
              className={css.mileageInput}
              placeholder="From "
            />
            <input type="text" className={css.mileageInput} placeholder="To" />
          </div>
        </label>
        <button type="button" className={css.searchButton}>
          Search
        </button>
      </div>
      <CarList cars={data?.cars} />
      <button type="button" className={css.loadMoreButton}>
        Load more
      </button>
    </div>
  );
};

export default CatalogClient;
