import { fetchBrandsServer, fetchCarsServer } from '@/lib/api/serverApi';
import CatalogClient from './Catalog.client';
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from '@tanstack/react-query';

async function CatalogPage() {
  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['cars'],
    queryFn: () => fetchCarsServer('1', '12', '', '', '', ''),
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
