import { Suspense } from "react";
import { BackgroundBeamsWithCollision } from "../components/backgorund"
import ProductList from "./productlist";
import { getProduk } from "./data";

export default async function Produk() {
const products = await getProduk();
  return (
    <BackgroundBeamsWithCollision className="h-full w-full bg-black">
      <div className="z-10 p-6">
        <div className="mx-auto  px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
        <Suspense fallback={<div className="text-white">Loading produk...</div>}>
          <ProductList items={products}/>
        </Suspense>

        </div>
      </div>
    </BackgroundBeamsWithCollision>
  );
}
