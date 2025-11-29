'use client';

import CarList from '@/components/CarList/CarList';
import { fetchBrandsClient, fetchCarsClient } from '@/lib/api/clientApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import css from './Catalog.module.css';
import { ChangeEventHandler, useState } from 'react';

const CatalogClient = () => {
  const [formFilters, setFormFilters] = useState({
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  });
  // --- -------------- Paginate and filter with Infinite Query------------- ---
  const [appliedFilters, setAppliedFilters] = useState(formFilters);
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    error,
    refetch,
  } = useInfiniteQuery({
    queryKey: ['cars', appliedFilters],
    queryFn: async ({ pageParam = 1 }) => {
      return await fetchCarsClient(
        pageParam.toString(),
        '12',
        appliedFilters.brand,
        appliedFilters.rentalPrice,
        appliedFilters.minMileage,
        appliedFilters.maxMileage
      );
    },
    initialPageParam: 1,
    getNextPageParam: lastPage =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    refetchOnMount: false,
  });
  // ------------------get brands with Simple Query -----------------
  const {
    data: brandsData,
    isLoading: isBrandsLoading,
    error: brandsError,
  } = useQuery({
    queryKey: ['brands'],
    queryFn: fetchBrandsClient,
    staleTime: 1000 * 60 * 60, // cache for 1 hour
  });

  if (isLoading || isBrandsLoading) return 'Is loading, please wait...';
  if (error || brandsError || !data) return 'Error loading catalog';

  const cars = data?.pages?.flatMap(p => p.cars) ?? [];
  const brands = brandsData || [];
  const uniquePrices = [...new Set(cars.map(car => car.rentalPrice))].filter(
    price => price !== undefined
  );

  const handleFilterChange: ChangeEventHandler<
    HTMLInputElement | HTMLSelectElement
  > = e => {
    const { name, value } = e.target;

    setFormFilters(prev => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSearchClick = () => {
    setAppliedFilters(formFilters);
  };

  return (
    <div className={`container ${css.pageContainer}`}>
      <div className={css.filterSection}>
        <label htmlFor="Car_brand" className={css.label}>
          Car brand
          <div className={css.selectWrapper}>
            <select
              name="brand"
              className={css.select}
              onChange={handleFilterChange}
              value={formFilters.brand}
            >
              <option
                value=""
                disabled
                selected
                hidden
                className={css.optionPlaceholder}
              >
                Choose a brand
              </option>
              {brands.map((brand, index) => (
                <option value={brand} key={index} className={css.option}>
                  {brand}
                </option>
              ))}
            </select>
          </div>
        </label>
        <label htmlFor="Price" className={css.label}>
          Price/ 1 hour
          <div className={css.selectWrapper}>
            <select
              name="rentalPrice"
              className={css.select}
              onChange={handleFilterChange}
              value={formFilters.rentalPrice}
            >
              <option
                value=""
                disabled
                selected
                hidden
                className={css.optionPlaceholder}
              >
                Choose a price
              </option>
              {uniquePrices.map((price, index) => (
                <option
                  value={price}
                  key={price + index}
                  className={css.option}
                >
                  {price}
                </option>
              ))}
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
              name="minMileage"
              onChange={handleFilterChange}
              value={formFilters.minMileage}
            />
            <input
              type="text"
              className={css.mileageInput}
              placeholder="To"
              name="maxMileage"
              onChange={handleFilterChange}
              value={formFilters.maxMileage}
            />
          </div>
        </label>
        <button
          type="button"
          className={css.searchButton}
          onClick={handleSearchClick}
        >
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
