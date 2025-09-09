"use client";

import React, { Suspense } from "react";
import Table from "./table";

export default function ProdukPage() {


  return (
    <div className="h-full w-full bg-slate-200">
      <div className="z-10">
        <div className="mx-auto px-2 py-5 w-full min-h-screen">
          <Suspense fallback={<div>Loading...</div>}>
            <Table />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
