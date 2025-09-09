"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Product } from "../../type";

export default function ProdukModal() {
  const { slug } = useParams();
  const router = useRouter();
  const [jumlah, setJumlah] = useState(1);
  const [ukuran, setSize] = useState("reguler");
  const [produk, setProduk] = useState<Product | null>(null);

  const [loading, setLoading] = useState(true);
  const [level, setLevel] = useState(1);
  const [cart, setCart] = useState<any>(null);
  const [loadingTambah, setLoadingTambah] = useState(false);
  useEffect(() => {
    async function fetchProduct() {
      try {
        const res = await fetch(`/api/produk/${slug}`);
        const data = await res.json();
        if (data.success) {
          setProduk(data.data);
        } else {
          setProduk(null);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    if (slug) fetchProduct();
  }, [slug]);

  const handelTambah = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setLoadingTambah(true);

    try {
      const cekRes = await fetch("/api/keranjang?mode=first", {
        method: "GET",
      });
      const cekData = await cekRes.json();

      if (cekData?.data?.transaksi?.[0]?.status === "pending") {
        alert("Selesaikan dahulu transaksi");
        return;
      }

      let res;
      if (cekData?.data?.status === "pending") {
        // PATCH kalau status pending
        res = await fetch(`/api/keranjang/${slug}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: produk?.id,
            jumlah,
            ukuran,
            level,
          }),
        });
      } else {
        // POST kalau belum ada cart
        res = await fetch("/api/keranjang", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            product_id: produk?.id,
            jumlah,
            ukuran,
            level,
          }),
        });
      }
      const data = await res.json();
      if (data.success) {
        setCart(data.data);
        alert("Produk berhasil ditambahkan ke keranjang!");
        setTimeout(() => {
          router.back();
        }, 500);
      } else {
        alert(data.message || "Gagal menambah ke keranjang");
      }
    } catch (err) {
      console.error(err);
      alert("Terjadi kesalahan");
    }

    setLoadingTambah(false);
  };

  if (!slug) return null;
  if (loading) return <div className="text-white">Loading...</div>;
  if (!produk) return <div className="text-white">Product not found</div>;

  const harga = produk.price ?? 0;
  const hitungHarga = () => {
    let total = harga * jumlah;
    if (ukuran === "large") {
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
          className="rounded w-full h-64 object-cover my-6"
        />

        <h1 className="text-xl font-bold mb-2">{produk.name}</h1>
        <p className="text-lg">Rp {hitungHarga().toLocaleString()}</p>

        <div className="mt-4 flex gap-4">
          <div>
            <label className="block font-semibold mb-1">Ukuran</label>
            <select
              value={ukuran}
              onChange={(e) => setSize(e.target.value)}
              className="text-black rounded"
            >
              <option value="reguler">Reguler</option>
              <option value="large">Large</option>
            </select>
          </div>
          <div>
            <label className="block font-semibold mb-1">Level</label>
            <select
              value={level}
              onChange={(e) => setLevel(Number(e.target.value))}
              className="text-black rounded"
            >
              {Array.from({ length: 10 }, (_, i) => (
                <option key={i + 1} value={i + 1}>
                  {i + 1}
                </option>
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
          <span className="ring-black ring-1 w-full text-center py-1 rounded">
            {jumlah}
          </span>
          <button
            type="button"
            disabled={loadingTambah}
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

        <button
          className="mt-4 w-full bg-cyan-600 text-white py-2 rounded hover:bg-cyan-700"
          onClick={handelTambah}
        >
          Tambah ke Keranjang
        </button>
      </div>
    </div>
  );
}
