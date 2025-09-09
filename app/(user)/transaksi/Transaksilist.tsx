"use client";

import { useState } from "react";

export default function Transaksilist({ items }: { items: any[] }) {
  const [openId, setOpenId] = useState<number | null>(null);

  if (!items || items.length === 0) {
    return <p className="text-white px-4 py-8">Belum ada transaksi</p>;
  }

  return (
    <div className="px-4 py-8 text-white">
      <h2 className="text-2xl font-bold mb-6 capitalize">Transaksi</h2>

      <div className="flex flex-col gap-6">
        {items.map((item: any, index: number) => {
          const isOpen = openId === item.id;

          return (
            <div
              key={item.id}
              className="bg-slate-200 dark:bg-slate-700 rounded p-4 shadow-md"
            >
              <div className="flex justify-between items-start">
                <div className="flex">
                  <h3 className="font-semibold mb-2">{index + 1}.</h3>
                  <div className="ml-2">
                    <p>Status : {item.transaksi?.status}</p>
                    <p>Total Barang : {item.transaksi?.jumlah}</p>
                    <p>Total Bayar : Rp {item.transaksi?.total_bayar}</p>
                  </div>
                </div>

                <button
                  className="p-1 bg-amber-300 rounded text-black hover:bg-amber-400"
                  onClick={() =>
                    setOpenId(isOpen ? null : item.id)
                  }
                >
                  {isOpen ? "Tutup" : "Lihat Detail"}
                </button>
              </div>

              {isOpen && (
                <div className="flex flex-col gap-3 mt-4">
                  {item.details.map((detail: any) => (
                    <div
                      key={detail.id}
                      className="flex gap-4 items-center bg-slate-100 dark:bg-slate-800 p-2 rounded"
                    >
                      <img
                        src={detail.product.imageSrc}
                        alt={detail.product.name}
                        className="w-20 h-20 object-cover rounded"
                        loading="lazy"
                      />
                      <div className="text-sm lg:text-base">
                        <p>Judul: {detail.product.name}</p>
                        <p>Level: {detail.level}</p>
                        <p>Ukuran: {detail.ukuran}</p>
                        <p>Jumlah: {detail.jumlah}</p>
                        <p>Subtotal: Rp {detail.subtotal}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
