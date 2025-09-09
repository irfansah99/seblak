"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fascinate_Inline } from "next/font/google";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";
import { signOut } from "next-auth/react";

const fascinate_Inline = Fascinate_Inline({
  subsets: ["latin"],
  weight: "400",
});

type NavbarProps = {
  sesi: Session | null;
};

export default function Navbar({ sesi }: NavbarProps) {
  const [isSticky, setIsSticky] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const winScroll = document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      setScrollProgress(scrolled);
      setIsSticky(winScroll > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const pathname = usePathname();

  return (
    <nav
      className={`w-full transition-all duration-300  ${
        isSticky
          ? "bg-white text-gray-900 lg:text-xl text-[12px]"
          : "bg-transparent text-white lg:text-2xl text-[14px]"
      } fixed left-0 z-50 top-0 p-4 lg:px-8`}
      aria-label="Global"
    >
      <div className="flex items-center justify-between">
        <div className="flex lg:flex-1">
          <h1
            className={`${
              fascinate_Inline.className
            } font-bold transition-all text-cyan-300 ${
              isSticky ? "lg:text-3xl text-sm" : "lg:text-5xl text-lg"
            }`}
          >
            Seblak99
          </h1>
        </div>

        <div className="flex lg:gap-14 font-semibold gap-1 mx-2">
          <Link
            href="/"
            className={`leading-6 lg:px-2 py-1 rounded ${
              pathname === "/" ? "text-cyan-400" : "hover:bg-slate-400"
            } `}
          >
            Home
          </Link>
          <Link
            href="/produk"
            className={`leading-6 px-2 py-1 rounded ${
              pathname === "/produk" ? "text-cyan-400" : "hover:bg-slate-400"
            } ${sesi ? "" : "pointer-events-none"} `}
          >
            Produk
          </Link>
          <Link
            href="/keranjang"
            className={`leading-6 px-2 py-1 rounded ${
              pathname === "/keranjang" ? "text-cyan-400" : "hover:bg-slate-400"
            } ${sesi ? "" : "pointer-events-none"} `}
          >
            Keranjang
          </Link>
          <Link
            href="/transaksi"
            className={`leading-6 px-2 py-1 rounded ${
              pathname === "/transaksi" ? "text-cyan-400" : "hover:bg-slate-400"
            } ${sesi ? "" : "pointer-events-none"} `}
          >
            Transaksi
          </Link>
        </div>

        <div className="flex lg:flex-1 lg:justify-end items-center gap-2">
          {sesi ? (
            <div className="relative group">
              <img
                src={
                  sesi.user?.image ||
                  "https://i.pinimg.com/1200x/ac/03/40/ac034076f2cf83bbf411c3e06a330cdb.jpg"
                }
                alt={sesi.user?.name || "user"}
                className="lg:w-14 lg:h-14 w-10 h-10 rounded-full object-cover cursor-pointer"
              />

              <ul className="absolute right-2  hidden flex-col bg-slate-600 rounded px-2 py-1 text-sm group-hover:flex">
                <Link
                  href="profil"
                  className="block px-2 py-1 hover:bg-slate-500 rounded"
                >
                  Profil
                </Link>
                {sesi.user?.role === "admin" && (
                  <Link
                    href="/dashboard"
                    className="block px-2 py-1 hover:bg-slate-500 rounded whitespace-nowrap"
                  >
                    Admin Page
                  </Link>
                )}

                <Link
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    signOut();
                  }}
                  className="block px-2 py-1 hover:bg-slate-500 rounded whitespace-nowrap"
                >
                  Sign Out
                </Link>
              </ul>
            </div>
          ) : (
            <Link
              href="/login"
              className="text-white bg-cyan-500 px-3 py-1 rounded-full"
            >
              Sign In
            </Link>
          )}
        </div>
      </div>

      <div className="absolute bottom-0 left-0 w-full">
        <div
          className={`bg-cyan-400 h-1 transition-all duration-300 ${
            isSticky ? "rounded-full" : "hidden"
          }`}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </nav>
  );
}
