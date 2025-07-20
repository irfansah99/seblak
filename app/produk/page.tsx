import dynamic from "next/dynamic";
import { getProduk } from "./data";

const ProductList = dynamic(() => import("./productlist"), {
  ssr: false,
  loading: () => <div className="text-white">Loading produk...</div>,
});

export default async function Produk() {
  const products = await getProduk();

  return (
    <div className="h-full w-full bg-black">
      <div className="z-10 p-6">
        <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
          <ProductList items={products} />
        </div>
      </div>
    </div>
  );
}
