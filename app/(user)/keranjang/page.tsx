import React, { Suspense } from "react";
import CartList from "./CartList";
import { auth } from "@/auth";
import { getFirstCart } from "@/app/api/keranjang/route";


export default async function ProdukPage() {
  const sesi = await auth();
  const carts = await getFirstCart(sesi?.user?.id);


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
