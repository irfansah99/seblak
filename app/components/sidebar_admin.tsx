"use client";
import Link from "next/link";
import { useState } from "react";
import { Fascinate_Inline } from "next/font/google";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";
import { Bars3Icon, BuildingStorefrontIcon, HomeIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { UserCircle2Icon } from "lucide-react";

const fascinate_Inline = Fascinate_Inline({
  subsets: ["latin"],
  weight: "400",
});
export default function Sidebar_admin({
  children,
  sesi,
}: {
  children: React.ReactNode;
  sesi: Session;
}) {
  const [Open, setOpen] = useState(false);
  const pathname = usePathname();
  const segment = pathname?.split("/").filter(Boolean).pop() || "home";
  const final = segment.replace('_',' ')
  const header = final.charAt(0).toUpperCase() + final.slice(1);

  return (
    <div className="flex h-screen">
      <div
        className={`fixed top-0 left-0 h-full bg-white p-4 shadow transition-all duration-300 ${
          Open ? "lg:w-[15%] w-[25%]" : "lg:w-[5%] w-[15%]"
        }`}
      >
        <div className="flex items-center">
          <h1
            className={`${
              fascinate_Inline.className
            } font-bold transition-all duration-300 text-cyan-300 lg:text-3xl text-sm ${
              Open ? "" : "hidden"
            }`}
          >
            Seblak99
          </h1>
          <button
            className="text-white lg:px-3  px-2 py-1 rounded bg-gray-900 hover:bg-gray-700 absolute top-4 right-4"
            onClick={() => setOpen(!Open)}
          >
            {Open ? (
              <XMarkIcon className="lg:w-6 lg:h-7 w-3 h-4" />
            ) : (
              <Bars3Icon className="w-6 h-7" />
            )}
          </button>
        </div>

        <ul className={`space-y-2  ${Open ? "mt-6" : "mt-15"  }`}>
          <Link href={'/dashboard'} className={`p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer ${Open ? '' : "justify-center"}   ${pathname === '/dashboard'? 'bg-slate-500 text-white hover:bg-slate-700' : ''}`}>
            <HomeIcon className="w-7 h-7" />
            <span className={`${Open ? "" : "hidden"}`}>Dashboard</span>
          </Link>

          <Link href={'/kelola_produk'} className={`p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer ${Open ? '' : "justify-center"}   ${pathname === '/kelola_produk'? 'bg-slate-500 text-white  hover:bg-slate-700' : ''}`}>
            <BuildingStorefrontIcon className="w-7 h-7" />
            <span className={`${Open ? "" : "hidden"}`}>Produk</span>
          </Link>
          <Link href={'/kelola_user'} className={`p-2 hover:bg-gray-200 rounded flex items-center gap-2 cursor-pointer ${Open ? '' : "justify-center"}   ${pathname === '/kelola_user'? 'bg-slate-500 text-white  hover:bg-slate-700' : ''}`}>
            <UserCircle2Icon className="w-7 h-7" />
            <span className={`${Open ? "" : "hidden"}`}>Kelola User</span>
          </Link>
        </ul>
      </div>

      <div
        className={`flex-1 transition-all duration-300 ${
          Open ? "lg:ml-[15%] ml-[25%]" : "lg:ml-[5%] ml-[15%]"
        }`}
      >
        <nav className="sticky top-0 px-4 py-2 bg-gray-900 text-white flex justify-between items-center z-50">
          <h1 className="text-2xl">Halaman {header}</h1>
          <div className="relative group">
            <img
              src={sesi.user?.image || "/default-avatar.png"}
              alt="profil"
              className="w-12 h-12 rounded-full border-2 border-white object-cover cursor-pointer"
            />
            <ul className="absolute right-0  bg-white text-black rounded shadow-lg opacity-0 group-hover:opacity-100 z-50 transition-opacity duration-200 flex flex-col min-w-[120px] px-2 py-1 text-sm">
              <Link
                href="/profil"
                className="block px-2 py-1 hover:bg-slate-500 rounded"
              >
                Profil
              </Link>
              <Link
                href="/"
                className="block px-2 py-1 hover:bg-slate-500 rounded"
              >
                User Page
              </Link>
              <button
                onClick={() => signOut()}
                className="text-left block px-2 py-1 hover:bg-slate-500 rounded whitespace-nowrap"
              >
                Sign Out
              </button>
            </ul>
          </div>
        </nav>

        <div>{children}</div>
      </div>
    </div>
  );
}
