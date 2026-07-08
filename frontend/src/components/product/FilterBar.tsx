import { useState, useEffect, useCallback } from 'react';
import { InputText } from 'primereact/inputtext';
import { Dropdown } from 'primereact/dropdown';
import type { ProductFilters, ProductCategory, SortField, SortOrder } from '../../types';

interface Props {
  onFiltersChange: (filters: ProductFilters) => void;
}

const CATEGORY_OPTIONS = [
  { label: 'All Categories', value: 'all' },
  { label: 'E-Books', value: 'ebook' },
  { label: 'Software', value: 'software' },
  { label: 'Courses', value: 'course' },
];

const SORT_OPTIONS = [
  { label: 'Default', value: '' },
  { label: 'Price: Low to High', value: 'price_asc' },
  { label: 'Price: High to Low', value: 'price_desc' },
  { label: 'Name: A to Z', value: 'name_asc' },
  { label: 'Name: Z to A', value: 'name_desc' },
];

export default function FilterBar({ onFiltersChange }: Props) {
  const [searchText, setSearchText] = useState('');
  const [category, setCategory] = useState<ProductCategory>('all');
  const [sort, setSort] = useState('');

  const buildAndEmit = useCallback(
    (name: string, cat: ProductCategory, sortValue: string) => {
      const [sortBy, sortOrder] = sortValue.split('_') as [SortField | undefined, SortOrder | undefined];
      onFiltersChange({
        name: name || undefined,
        category: cat === 'all' ? undefined : cat,
        sortBy: sortBy || undefined,
        sortOrder: sortOrder || undefined,
      });
    },
    [onFiltersChange]
  );

  useEffect(() => {
    const timer = setTimeout(() => {
      buildAndEmit(searchText, category, sort);
    }, 300);
    return () => clearTimeout(timer);
  }, [searchText, category, sort, buildAndEmit]);

  return (
    <div className="flex flex-col gap-3 mb-6">
      <div className="relative w-full">
        <i className="pi pi-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 z-10" />
        <InputText
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          placeholder="Search products..."
          className="w-full pl-9 border-gray-200"
          aria-label="Search products by name"
        />
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Dropdown
          value={category}
          options={CATEGORY_OPTIONS}
          optionValue="value"
          onChange={(e) => setCategory(e.value as ProductCategory)}
          className="w-full sm:w-52"
          aria-label="Filter by category"
        />

        <Dropdown
          value={sort}
          options={SORT_OPTIONS}
          optionValue="value"
          onChange={(e) => setSort(e.value as string)}
          className="w-full sm:w-56"
          aria-label="Sort products"
        />
      </div>
    </div>
  );
}
