"use client";
import { useState } from "react";

export default function ButtonAksi({ items }: { items: any }) {

  const [status, setStatus] = useState(items.transaksi?.status || "pending");

  const handleClick = async () => {
    try {
      const res = await fetch(`/api/transaksi/${items.id}`, {
        method: "PUT",
      });
      const data = await res.json();
      console.log("Update result:", data);

      if (status === "pending") setStatus("proses");
      else if (status === "proses") setStatus("selesai");

      alert("Berhasil diproses");
    } catch (err) {
      console.error("Gagal update:", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        className="bg-blue-700 text-white px-2 py-1 rounded hover:scale-110 active:scale-100 hover:bg-blue-400 active:bg-indigo-500 transition-all duration-300 delay-200"
      >
        {status === "pending" ? "Proses" : status === "proses" ? "Selesai" : "Selesai"}
      </button>
    </div>
  );
}
