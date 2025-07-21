'use client';

import { useSearchParams } from "next/navigation";
import { BackgroundGradient } from "../components/background-gradient";
import Link from "next/link";
import { Product } from "./type";

export default function ProductList({ items }: { items: Product[] }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  
  const filtered = kategori
    ? items.filter((item) => item.kategori === kategori)
    : items;


  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {kategori ? kategori : "Semua Produk"}
      </h2>

      <div className="grid gap-x-6  gap-y-10 sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        {filtered.map((product) => (
          <BackgroundGradient
            key={product.id}
            className="sm:p-4 p-2 rounded-3xl bg-zinc-800 w-full h-full"
          >
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="aspect-square w-full rounded-xl bg-gray-200 object-cover"
            />
            <h3 className="mt-4 text-[12px] text-white">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-white">$ {product.price}</p>
            <Link
              href={{
                pathname: `/produk/${product.slug}`,
                query: kategori ? { kategori } : undefined,
              }}
              scroll={false} 
            >
              <div className="py-1 w-full mb-2 rounded text-center bg-blue-500 hover:bg-blue-800">
                Tambah
              </div>
            </Link>

          </BackgroundGradient>
        ))}
      </div>
    </div>
  );
}
