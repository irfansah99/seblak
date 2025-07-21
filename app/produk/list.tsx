'use client';

import dynamic from 'next/dynamic';
import { Product } from './type';

const ProductList = dynamic(() => import('./productlist'), { ssr: false });

export default function ProductListWrapper({ items }: { items: Product[] }) {
  return <ProductList items={items} />;
}
