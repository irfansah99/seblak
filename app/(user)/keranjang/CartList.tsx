'use client';

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useTransition } from "react";
import { deleteCartDetail } from "@/app/components/lib/action";
import { useImmer } from "use-immer";

export default function CartList({ items }: { items: any }) {
  const router = useRouter();
  const [cartDetails, updateCartDetails] = useImmer(items?.details || []);
  const [loadingId, setLoadingId] = useImmer<number | null>(null);
  const [isPending, startTransition] = useTransition();

  const totalBarang = cartDetails.reduce((acc, item) => acc + item.jumlah, 0);
  const totalHarga = cartDetails.reduce((acc, item) => {
    let harga = Number(item.product.price || 0);
    if (item.ukuran === "large") {
      harga += harga * 0.25;
    }
    return acc + harga * Number(item.jumlah || 0);
  }, 0);

  const handleCheckout = async (cartId: number) => {
    try {
      setLoadingId(cartId);

      const res = await fetch(`/api/transaksi`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cart_id: cartId }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Gagal checkout");

      alert("Checkout berhasil!");
      router.refresh();
    } catch (err) {
      console.error(err);
      alert("Gagal checkout, mohon coba lagi");
    } finally {
      setLoadingId(null);
    }
  };

  const handleDelete = (id: number) => {
    startTransition(async () => {
      const res = await deleteCartDetail(id);
      if (res.success) {
        updateCartDetails((draft) => {
          const idx = draft.findIndex((item) => item.id === id);
          if (idx !== -1) draft.splice(idx, 1);
        });
      } else {
        alert(res.message);
      }
    });
  };

  const updateJumlahServer = async (id: number, jumlahBaru: number) => {
    try {
      setLoadingId(id);
      const res = await fetch(`/api/keranjang_id/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ jumlah: jumlahBaru }),
      });

      const data = await res.json();
      if (!data.success) throw new Error(data.message || "Gagal mengubah jumlah");
    } catch (err) {
      console.error(err);
      alert("Gagal update, mohon coba lagi");
      router.refresh();
    } finally {
      setLoadingId(null);
    }
  };

  const handleChangeJumlah = (id: number, nilai: number) => {
    updateCartDetails((draft) => {
      const item = draft.find((i) => i.id === id);
      if (item) {
        const jumlahBaru = Math.max(1, item.jumlah + nilai);

        let harga = Number(item.product.price || 0);
        if (item.ukuran === "large") {
          harga += harga * 0.25;
        }

        item.jumlah = jumlahBaru;
        item.subtotal = harga * jumlahBaru;

        updateJumlahServer(id, jumlahBaru); 
      }
    });
  };

  if (!cartDetails || cartDetails.length === 0 || items.status === "selesai") {
    return <p className="text-white px-4 py-8">Keranjang kosong</p>;
  }

  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">Keranjang</h2>

      <div className="flex flex-col gap-4 justify-center">
        {cartDetails.map((item: any, index: number) => (
          <div
            key={item.id}
            className="flex gap-4 lg:text-2xl bg-slate-200 dark:bg-slate-700 rounded p-2 relative"
          >
            <h1>{index + 1}</h1>
            <img
              src={item.product.imageSrc}
              alt={item.product.name}
              className="w-20 h-20 object-cover rounded"
            />
            <div>
              <p>Judul: {item?.product?.name}</p>
              <p>level: {item.level}</p>
              <p>ukuran: {item.ukuran}</p>
              <p>Jumlah: {item.jumlah}</p>
              <p>Total Harga: Rp {item.subtotal}</p>

              <div className="flex gap-2 items-center">
                <button
                  type="button"
                  disabled={loadingId === item.id}
                  className="lg:px-3 px-2 py-1 bg-red-500 text-white rounded"
                  onClick={() => handleChangeJumlah(item.id, -1)}
                >
                  -
                </button>
                <span className="bg-slate-200 px-2 py-1 dark:text-black rounded">
                  {item.jumlah}
                </span>
                <button
                  type="button"
                  disabled={loadingId === item.id}
                  className="lg:px-3 px-2 py-1 bg-green-500 text-white rounded"
                  onClick={() => handleChangeJumlah(item.id, 1)}
                >
                  +
                </button>
              </div>
            </div>
            <button
              type="button"
              className="lg:px-3 px-2 py-1 bg-slate-900 hover:text-slate-900 hover:bg-slate-400 active:text-slate-50 text-white rounded absolute right-2 top-2"
              onClick={() => handleDelete(item.id)}
              disabled={isPending}
            >
              X
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 flex flex-col justify-center bg-slate-700 w-full p-5 mx-auto rounded-lg">
        <div className="flex justify-between mb-4 border-b-2 border-slate-500 pb-2">
          <p>Total Barang</p>
          <p>{totalBarang}</p>
        </div>
        <div className="flex justify-between mb-4 border-b-2 border-slate-500 pb-2">
          <p>Total Bayar</p>
          <p>Rp {totalHarga}</p>
        </div>
        <Button
          className="bg-slate-900 transform hover:bg-slate-600 transition duration-300 active:bg-cyan-950 shadow-cyan-500 shadow-2xs"
          variant="outline"
          onClick={() => handleCheckout(items.id)}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
}
