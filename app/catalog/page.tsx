import { fetchBrandsServer, fetchCarsServer } from '@/lib/api/serverApi';
import CatalogClient from './Catalog.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { PaginatedCarsResponse } from '@/types/car';

export default async function CatalogPage() {
  const queryClient = new QueryClient();
  const initialAppliedFilters = {
    brand: '',
    rentalPrice: '',
    minMileage: '',
    maxMileage: '',
  };

  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars', initialAppliedFilters],
    queryFn: ({ pageParam = 1 }) =>
      fetchCarsServer(pageParam.toString(), '12', '', '', '', ''),
    initialPageParam: 1,
    getNextPageParam: (lastPage: PaginatedCarsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
  });

  const dehydratedState = dehydrate(queryClient);

  return (
    <HydrationBoundary state={dehydratedState}>
      <CatalogClient />
    </HydrationBoundary>
  );
}
