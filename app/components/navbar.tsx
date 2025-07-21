"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Fascinate_Inline } from "next/font/google";
import { usePathname } from "next/navigation";

const fascinate_Inline = Fascinate_Inline({
  subsets: ["latin"],
  weight: "400",
});

export default function Navbar() {
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
      className={`w-full transition-all duration-300  ${isSticky ? "bg-white  text-gray-900 lg:text-xl text-[12px]" : "bg-transparent text-white lg:text-2xl text-[14px]"} fixed  left-0 z-50  top-0  p-4 lg:px-8`}
      aria-label="Global"
    >
      <div className="flex items-center justify-between">
        <div className="flex lg:flex-1">
          <h1
            className={`${fascinate_Inline.className} font-bold transition-all text-cyan-300 ${isSticky ? "lg:text-3xl text-sm" : "lg:text-5xl text-lg"}`}
          >
            Seblak99
          </h1>
        </div>
        <div className='flex lg:gap-14 font-semibold gap-1 mx-2'>
          <Link href="/" className={`leading-6 lg:px-2 py-1 rounded ${
    pathname === "/" ? " text-cyan-400" : "hover:bg-slate-400"
  }`}>
            Home
          </Link>
          <Link href="/produk" className={`leading-6 px-2 py-1 rounded ${
    pathname === "/produk" ? " text-cyan-400" : "hover:bg-slate-400"
  }`}>
            Produk
          </Link>
          <Link href="/keranjang" className={`leading-6 px-2 py-1 rounded ${
    pathname === "/keranjang" ? " text-cyan-400" : "hover:bg-slate-400"
  }`}>
            Keranjang
          </Link>
        </div>
        <div className="flex lg:flex-1 lg:justify-end">
        <img src="https://i.pinimg.com/1200x/ac/03/40/ac034076f2cf83bbf411c3e06a330cdb.jpg" alt=""
          className="lg:w-14 lg:h-14 w-10 h-10 rounded-full object-cover" />

        </div>
      </div>
      <div className="absolute bottom-0 left-0 w-full ">
        <div
          className={`bg-cyan-400 h-1 transition-all duration-300 
              ${isSticky ? "rounded-full" : "hidden"}`}
          style={{ width: `${scrollProgress}%` }}
        ></div>
      </div>
    </nav>
  );
}
