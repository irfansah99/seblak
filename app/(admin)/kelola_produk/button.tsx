import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { useState } from "react";

export  function ButtonAksi({ slug }: { slug: string }){
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!confirm("Yakin mau hapus produk ini?")) return;

    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`/api/produk/${slug}`, {
        method: "DELETE",
      });

      const result = await res.json();

      if (!res.ok) {
        setMessage(result.message || "Gagal hapus produk");
      } else {
        setMessage("Produk berhasil dihapus ✅");
      }
    } catch (err) {
      console.error(err);
      setMessage("Terjadi kesalahan server.");
    } finally {
      setLoading(false);
    }
  };
    return(
        <div className="flex gap-2 justify-end">
        <button
                onClick={handleDelete}
                disabled={loading}
          className="bg-red-700 text-white p-1 rounded hover:scale-110 active:scale-100 hover:bg-red-500 active:bg-red-900 transition-all duration-300 delay-200"
        >
          <TrashIcon className="w-6 h-6"/>
        </button>
        <Link href={`/kelola_produk/edit/${slug}`}
          className="bg-yellow-500 text-white p-1 rounded hover:scale-110 active:scale-100 hover:bg-yellow-300 active:bg-yellow-900 transition-all duration-300 delay-200"
        >
          <PencilSquareIcon className="w-6 h-6"/>
        </Link>
      </div>
    )
}
