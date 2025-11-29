import { fetchBrandsServer, fetchCarsServer } from '@/lib/api/serverApi';
import CatalogClient from './Catalog.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';
import { PaginatedCarsResponse } from '@/types/car';

async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchInfiniteQuery({
    queryKey: ['cars'],
    queryFn: () => fetchCarsServer('1', '12', '', '', '', ''),
    getNextPageParam: (lastPage: PaginatedCarsResponse) =>
      lastPage.page < lastPage.totalPages ? lastPage.page + 1 : undefined,
    initialPageParam: 1,
  });

  return (
    <div>
      <HydrationBoundary state={dehydrate(queryClient)}>
        <CatalogClient />
      </HydrationBoundary>
    </div>
  );
}

export default CatalogPage;
