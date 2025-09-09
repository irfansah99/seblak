import { Suspense } from "react";
import Transaksilist from "./Transaksilist";

import { auth } from "@/auth";
import { getTransaksi } from "@/lib/action";


export default async function Transaksi() {
const sesi = await auth()
const transaksi = await getTransaksi(sesi?.user?.id)
  return (
    <div className="w-full bg-black min-h-screen">
      <div className="mx-auto px-4 py-8 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8 w-full">
        <Suspense fallback={<div>Loading...</div>}>
          <Transaksilist items={transaksi.data} />
        </Suspense>
      </div>
    </div>
  );
}
