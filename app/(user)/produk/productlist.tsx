'use client';

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { Product } from "./type";
import { useEffect, useState } from "react";
import { BackgroundGradient } from "@/app/components/background-gradient";

export default function ProductList({ items }: { items: Product[] }) {
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  const { slug } = useParams();
  const router = useRouter();
  
  const [loadingTambah, setLoadingTambah] = useState(false);

  const filtered = kategori
    ? items.filter((item) => item.kategori === kategori)
    : items;

  useEffect(() => {
    if (!slug) {
      setLoadingTambah(false);
    }
  }, [slug]);

  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {kategori ?? "Semua Produk"}
      </h2>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        {filtered.map((product) => (
          <BackgroundGradient
            key={product.id}
            className="sm:p-4 p-2 rounded-3xl bg-zinc-800 w-full h-full"
          >
            <img
              src={product.imageSrc}
              className="aspect-square w-full rounded-xl bg-gray-200 object-cover"
              alt={product.name}
              loading="lazy"
            />
            <h3 className="mt-4 text-[12px] text-white">{product.name}</h3>
            <p className="mt-1 text-lg font-medium text-white">
              $ {product.price ? Number(product.price) : 0}
            </p>
            <button
              disabled={loadingTambah}
              onClick={() => {
                setLoadingTambah(true); 
                router.push(
                  `/produk/${product.slug}${kategori ? `?kategori=${kategori}` : ''}`,
                  { scroll: false }
                );
              }}
              className="py-1 w-full mb-2 rounded text-center bg-blue-500 hover:bg-blue-800"
            >
              {loadingTambah ? 'Loading...' : 'Tambah'}
            </button>
          </BackgroundGradient>
        ))}
      </div>
    </div>
  );
}
