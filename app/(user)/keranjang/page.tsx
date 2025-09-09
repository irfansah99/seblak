import React, { Suspense } from "react";
import CartList from "./CartList";

async function getFirstCart() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/keranjang`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Gagal mengambil data keranjang");
  }

  const data = await res.json();
  return data.data;
}


export default async function KeranjangPage() {
  const carts = await getFirstCart();


  return (
    <div className="h-full w-full bg-black">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <CartList items={carts} />
        </Suspense>
        </div>

    </div>
  );
}
