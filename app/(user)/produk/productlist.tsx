'use client';

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Product } from "./type";
import { useState } from "react";
import { BackgroundGradient } from "@/app/components/background-gradient";
import useSWR from "swr";

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ProductList() {
  const searchParams = useSearchParams();
  const kategori = searchParams.get("kategori");
  const { slug } = useParams();
  const router = useRouter();
  
  const [loadingTambah, setLoadingTambah] = useState(false);
  const { data, error } = useSWR("/api/produk", fetcher);

  if (error) return <p>Error fetching products</p>;
  if (!data) return <p>Loading...</p>;
  if (data.data.length === 0) return <p>Tidak ada produk</p>;

  const filtered = kategori
    ? data.data.filter((item: Product) => item.kategori === kategori)
    : data.data;

  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">
        {kategori ?? "Semua Produk"}
      </h2>

      <div className="grid gap-x-6 gap-y-10 sm:grid-cols-3 grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 xl:gap-x-8">
        {filtered.map((product: Product) => (
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
              $ {Number(product.price)}
            </p>
            <button
              disabled={loadingTambah}
              onClick={async () => {
                setLoadingTambah(true);
                await router.push(
                  `/produk/${product.slug}${kategori ? `?kategori=${kategori}` : ''}`,
                  { scroll: false }
                );
                setLoadingTambah(false);
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
