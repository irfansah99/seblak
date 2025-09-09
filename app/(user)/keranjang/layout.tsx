

export default function ProdukLayout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <main className="flex-1 p-4 relative">
        {children}
        {modal}
      </main>
    </div>
  );
}

