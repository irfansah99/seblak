import { Suspense } from "react";
import Sidebar from "./sidebar"

export default function ProdukLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <Suspense fallback={<div>Loading sidebar...</div>}>
        <Sidebar />
      </Suspense>
      <main className="flex-1 p-4 relative">
        {children}
        {modal}
      </main>
    </div>
  );
}

