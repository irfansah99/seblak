import { Suspense } from "react";
import FormProdukEdit from "./form";

export default async function Edit_Produk({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params; 

  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produk/${slug}`, {
    cache: "no-store",
  });

  const produk = await res.json();

  return (
    <div className="h-full w-full bg-slate-200">
      <div className="z-10">
        <div className="mx-auto px-2 py-5 w-full min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <FormProdukEdit produk={produk.data} />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
