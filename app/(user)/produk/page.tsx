import ProductList from "./productlist";
import { Suspense } from "react";
import React from "react";

async function getProducts() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produk`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data produk");
  }

  const data = await res.json();
  return data.data;
}
export default async function ProdukPage() {
  const products = await getProducts();
  return (
    <div className="h-full w-full bg-black">
      <div className="z-10 p-6">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList items={products} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
