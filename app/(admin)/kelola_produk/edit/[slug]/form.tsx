"use client";

import { editprodukCredentials } from "@/lib/action";
import Link from "next/link";
import { useActionState, useState } from "react";
import { useFormStatus } from "react-dom";

export default function FormProdukEdit({ produk }: { produk: any }) {
  const [state, formAction] = useActionState(editprodukCredentials, null);
  const { pending } = useFormStatus();
  const [gambar, Setgambar] = useState(produk.imageSrc || null);
  return (
    <form action={formAction} className="space-y-6">
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-500 rounded bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}
     <input type="hidden" name="oldSlug" value={produk.slug} />
     <input type="hidden" name="oldImg" value={produk.imageSrc.split("/").pop()} />
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="Nama Produk"
          defaultValue={produk.name}
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.name}</span>
      </div>

      <div>
        <label
          htmlFor="kategori"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Kategori
        </label>
        <input
          type="text"
          name="kategori"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="food / drink"
          defaultValue={produk.kategori}
        />
        <span className="text-sm text-red-500 mt-2">
          {state?.error?.kategori}
        </span>
      </div>

      <div>
        <label
          htmlFor="price"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Price
        </label>
        <input
          type="number"
          name="price"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="50"
          defaultValue={produk.price}
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.price}</span>
      </div>
      <div>
        <label
          htmlFor="stok"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Stok
        </label>
        <input
          type="number"
          name="stok"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="50"
          defaultValue={produk.stok}
        />
        <span className="text-sm text-red-500 mt-2">{state?.error?.stok}</span>
      </div>

      <div>
        <label
          htmlFor="imageSrc"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gambar
        </label>
        <input
          type="file"
          name="imageSrc"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              Setgambar(URL.createObjectURL(file));
            }
          }}
        />

        <span className="text-sm text-red-500 mt-2">
          {state?.error?.imageSrc}
        </span>
      </div>

      {gambar && (
        <div className="mt-2">
          <img
            src={gambar}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center hover:bg-blue-600 disabled:opacity-50"
      >
        {pending ? "Updating..." : "Update"}
      </button>
    </form>
  );
}
