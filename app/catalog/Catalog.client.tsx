'use client';

import CarList from '@/components/CarList/CarList';
import { fetchBrandsClient, fetchCarsClient } from '@/lib/api/clientApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import css from './Catalog.module.css';

const CatalogClient = () => {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
  } = useInfiniteQuery({
    queryKey: ['cars'],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchCarsClient(pageParam.toString(), '12', '', '', '', '');
    },
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    refetchOnMount: false,
  });

  if (isLoading) return 'Is loading, please wait...';
  if (error || !data) return 'Error loading catalog';

  const cars = data?.pages?.flatMap(p => p.cars) ?? [];
  console.log('cars:', cars);

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
      <CarList cars={cars} />
      {hasNextPage && (
        <button
          type="button"
          className={css.loadMoreButton}
          onClick={() => fetchNextPage()}
          disabled={isFetchingNextPage}
        >
          {isFetchingNextPage ? 'Loading...' : 'Load more'}
        </button>
      )}
    </div>
  );
};

export default CatalogClient;
