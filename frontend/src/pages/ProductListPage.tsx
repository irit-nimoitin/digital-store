import { useState } from 'react';
import { Message } from 'primereact/message';
import FilterBar from '../components/product/FilterBar';
import ProductCard from '../components/product/ProductCard';
import SkeletonCard from '../components/product/SkeletonCard';
import { useProducts } from '../hooks/useProducts';
import type { ProductFilters } from '../types';

export default function ProductListPage() {
  const [filters, setFilters] = useState<ProductFilters>({});
  const { data, isLoading, isError, error } = useProducts(filters);

  const products = data?.items ?? [];
  const hasResults = products.length > 0;
  const isFiltering = Object.values(filters).some(Boolean);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Products</h1>
        <p className="text-gray-500 mt-1">
          {data ? `${data.total} product${data.total !== 1 ? 's' : ''} available` : '\u00A0'}
        </p>
      </div>

      <FilterBar onFiltersChange={setFilters} />

      {isError && (
        <Message
          severity="error"
          text={(error as { detail?: string })?.detail ?? 'Failed to load products. Please try again.'}
          className="w-full mb-6"
        />
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))}
        </div>
      ) : !hasResults ? (
        <div className="flex flex-col items-center justify-center py-24 text-center">
          <i className="pi pi-search text-5xl text-gray-300 mb-4" />
          <h2 className="text-xl font-semibold text-gray-600 mb-2">No products found</h2>
          <p className="text-gray-400">
            {isFiltering
              ? 'Try adjusting your filters or search term.'
              : 'No products are available right now.'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
