'use client';

import CarList from '@/components/CarList/CarList';
import { fetchBrandsClient, fetchCarsClient } from '@/lib/api/clientApi';
import { useInfiniteQuery, useQuery } from '@tanstack/react-query';
import css from './Catalog.module.css';
import { ChangeEventHandler } from 'react';
import * as Select from '@radix-ui/react-select';
import { useCarStore } from '@/lib/stores/carStore';

const CatalogClient = () => {
  const formFilters = useCarStore(s => s.formFilters);
  const appliedFilters = useCarStore(s => s.appliedFilters);
  const setFormFilter = useCarStore(s => s.setFormFilter);
  const setAppliedFilters = useCarStore(s => s.setAppliedFilters);

  // --- -------------- Paginate and filter with Infinite Query------------- ---

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
      console.log('Запитую сторінку:', pageParam);
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
    getNextPageParam: lastPage => {
      const current = Number(lastPage.page);
      return current < lastPage.totalPages ? current + 1 : undefined;
      refetchOnMount: false;
    },
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

    setFormFilter(name as keyof typeof formFilters, value);
  };

  const handleSearchClick = () => {
    setAppliedFilters();
  };

  return (
    <div className={`container ${css.pageContainer}`}>
      <div className={css.filterSection}>
        <label htmlFor="Car_brand" className={css.label}>
          Car brand
          <div className={css.selectWrapper}>
            <Select.Root
              value={formFilters.brand}
              onValueChange={value => setFormFilter('brand', value)}
            >
              <Select.Trigger className={css.radixSelectTrigger}>
                <Select.Value placeholder="Choose a brand" />
              </Select.Trigger>

              <Select.Content
                position="popper"
                sideOffset={4}
                className={css.radixSelectContent}
              >
                <Select.Viewport className={css.radixSelectViewport}>
                  {brands.map(brand => (
                    <Select.Item
                      key={brand}
                      value={brand}
                      className={css.radixSelectItem}
                    >
                      <Select.ItemText>{brand}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
          </div>
        </label>
        <label htmlFor="Price" className={css.label}>
          Price/ 1 hour
          <div className={css.selectWrapper}>
            <Select.Root
              value={formFilters.rentalPrice}
              onValueChange={value => setFormFilter('rentalPrice', value)}
            >
              <Select.Trigger className={css.radixSelectTrigger}>
                <Select.Value
                  placeholder="Choose a price"
                  aria-label={formFilters.rentalPrice}
                >
                  {formFilters.rentalPrice
                    ? `To $${formFilters.rentalPrice}`
                    : ''}
                </Select.Value>
              </Select.Trigger>

              <Select.Content
                position="popper"
                sideOffset={4}
                className={css.radixSelectContent}
              >
                <Select.Viewport className={css.radixSelectViewport}>
                  {uniquePrices.map((price, index) => (
                    <Select.Item
                      key={price + index}
                      value={price}
                      className={css.radixSelectItem}
                    >
                      <Select.ItemText>{price}</Select.ItemText>
                    </Select.Item>
                  ))}
                </Select.Viewport>
              </Select.Content>
            </Select.Root>
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
