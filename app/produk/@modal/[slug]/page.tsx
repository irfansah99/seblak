'use client';

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getProduk } from "@/app/produk/data";
import { Product } from "../../type";

export default function ProdukModal() {
  const { slug } = useParams();
  const router = useRouter();
  const [jumlah, setJumlah] = useState(1);
  const [size, setSize] = useState("reguler");
  const [produk, setProduk] = useState<Product | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const products = await getProduk();
      const found = products.find((item : Product) => item.slug === slug);
      setProduk(found || null);
    };
    fetchData();
  }, [slug]);

  if (!produk) return <div className="text-white">Loading...</div>;

  const harga = produk.price;

  const hitungHarga = () => {
    let total = harga * jumlah;
    if (size === "large") {
      total += harga * 0.25 * jumlah;
    }
    return total;
  };

  return (
    <div className="fixed inset-0 backdrop-blur-md bg-black/50 z-50 flex items-center justify-center">
      <div className="bg-white text-black p-6 rounded-xl relative max-w-md w-full">
        <button
          onClick={() => router.back()}
          className="absolute top-2 right-2 bg-red-500 px-2 py-1 rounded text-white"
        >
          ✕
        </button>

        <img
          src={produk.imageSrc}
          alt={produk.imageAlt}
          className="rounded w-full h-64 object-cover my-6"
        />

        <h1 className="text-xl font-bold mb-2">{produk.name}</h1>
        <p className="text-lg">$ {hitungHarga()}</p>

        <div className="mt-4 flex gap-4">
          <div>
            <label htmlFor="size" className="block font-semibold mb-1">Size</label>
            <select
              name="size"
              id="size"
              className="text-black rounded"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            >
              <option value="reguler">Reguler</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label htmlFor="level" className="block font-semibold mb-1">Level</label>
            <select name="level" id="level" className="text-black rounded">
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>{i + 1}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="flex gap-2 items-center mt-2">
          <button
            type="button"
            className="lg:px-3 px-2 py-1 ring-1 ring-black text-black rounded"
            onClick={() => setJumlah(jumlah > 1 ? jumlah - 1 : 1)}
          >
            -
          </button>
          <span className="ring-black ring-1 w-full text-center py-1 rounded">{jumlah}</span>
          <button
            type="button"
            className="lg:px-3 px-2 py-1 ring-1 ring-black text-black rounded"
            onClick={() => {
              if (jumlah < produk.stok) {
                setJumlah(jumlah + 1);
              } else {
                alert("Stok tidak cukup");
              }
            }}
          >
            +
          </button>
        </div>

        <button className="mt-4 w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700">
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
