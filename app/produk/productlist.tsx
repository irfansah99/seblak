'use client';

import { BackgroundGradient } from "../components/background-gradient";
import Link from "next/link";
import { Product } from "./type";

export default function ProductList({ items }: { items: Product[] }) {



  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        { "Semua Produk"}
      </h2>

      <div className="grid gap-x-6 gap-y-10 grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        {items.map((product) => (
          <BackgroundGradient
            key={product.id}
            className="p-4 rounded-3xl bg-zinc-800"
          >
            <img
              src={product.imageSrc}
              alt={product.imageAlt}
              className="aspect-square w-full rounded-xl bg-gray-200 object-cover"
            />
            <h3 className="mt-4 text-sm text-white">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-white">$ {product.price}</p>
            <Link
              href={{
                pathname: `/produk/${product.slug}`,
                //query: kategori ? { kategori } : undefined,
              }}
              scroll={false} 
            >
              <div className="py-1 w-full rounded text-center bg-blue-500 hover:bg-blue-800">
                Tambah
              </div>
            </Link>

          </BackgroundGradient>
        ))}
      </div>
    </div>
  );
}
