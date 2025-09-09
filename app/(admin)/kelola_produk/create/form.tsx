"use client";

import { produkCredentials } from "@/lib/action";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function FormProduk() {
  const [state, formAction] = useActionState(produkCredentials, null);
  const { pending } = useFormStatus();
  const [Gambar, setGambar] = useState<string | undefined>(undefined);

  return (
    <form action={formAction} className="space-y-6" >
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-500 rounded bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}


      <div>
        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="Nama Produk"
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
      </div>

      <div>
        <label htmlFor="kategori" className="block mb-2 text-sm font-medium text-gray-900">
          Kategori
        </label>
        <input
          type="text"
          name="kategori"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="food / drink"
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.kategori}</span>
      </div>
      <div>
        <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
          Price
        </label>
        <input
          type="number"
          name="price"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="50"
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.price}</span>
      </div>
      <div>
        <label htmlFor="stok" className="block mb-2 text-sm font-medium text-gray-900">
          Stok
        </label>
        <input
          type="number"
          name="stok"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="50"
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.stok}</span>
      </div>

      <div>
        <label htmlFor="imageSrc" className="block mb-2 text-sm font-medium text-gray-900">
          Gambar
        </label>
        <input
          type="file"
          name="imageSrc"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              setGambar(URL.createObjectURL(file));
            }
          }}
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.imageSrc}</span>

        {Gambar && (
        <div className="mt-2">
          <img
            src={Gambar}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center hover:bg-blue-600 disabled:opacity-50"
      >
        {pending ? "Creating..." : "Create"}
      </button>
    </form>
  );
}
