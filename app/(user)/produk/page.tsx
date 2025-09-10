import ProductList from "./productlist";
import { Suspense } from "react";
import React from "react";


export default async function ProdukPage() {

  return (
    <div className="h-full w-full bg-black">
      <div className="z-10 p-6">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
          <Suspense fallback={<div>Loading...</div>}>
            <ProductList  />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
