import { Suspense } from "react";
import TableProduct from "./table";

export default function kelola_Produk(){
    return (
        <div className="h-full w-full bg-slate-200 lg:px-25 lg:py-5-">
          <div className="z-10">
            <div className="mx-auto px-2 py-5 w-full min-h-screen">
              <Suspense fallback={<div>Loading...</div>}>
                <TableProduct />
              </Suspense>
            </div>
          </div>
        </div>
      );
    }
    