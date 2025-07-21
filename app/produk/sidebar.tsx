'use client'
import { useState } from "react"; // 
import { BackgroundGradient } from "../components/background-gradient";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { FaUtensils, FaIceCream, FaWineGlass } from "react-icons/fa";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const categories = [
  { label: "Semua", value: "", icon: <FaUtensils className="text-yellow-400 text-4xl" /> },
  { label: "Food", value: "food", icon: <FaUtensils className="text-yellow-400 text-4xl" /> },
  { label: "Drink", value: "drink", icon: <FaWineGlass className="text-red-400 text-4xl" /> },
  { label: "Extra", value: "extra", icon: <FaIceCream className="text-green-400 text-4xl" /> },
];

export default function Sidebar() {
const [open, setOpen] = useState(true);


  return (
    <>
      {/* Tombol buka sidebar */}
      {!open && (
        <button
            onClick={() => setOpen(true)}
            className="fixed top-24 left-4 z-20 p-2 rounded bg-white/20 ring-2 ring-cyan-500 text-white 
            hover:bg-white/30 hover:ring-cyan-300 
            hover:shadow-lg hover:shadow-cyan-400/50 
            transition-all duration-300 ease-in-out hover:scale-105"
            >
            <Bars3Icon className="w-6 h-6" />
            </button>

      )}

      {open && (
        <div className={`fixed top-20  bottom-56 left-0 md:w-64 w-52 z-20 transition-transform duration-300 py-5 ${
            open ? "translate-x-0" : "-translate-x-full"
          }`}>
          <BackgroundGradient className="rounded-3xl lg:h-[700px] md:h-[75vh] bg-zinc-800">
            <div className="bg-white/10 backdrop-blur-md text-white p-4 rounded-3xl h-full">
            <ul className="rounded mt-16 space-y-3 flex flex-col justify-center items-center gap-2">
              {categories.map((cat) => {


                return (
                  <Link
                    key={cat.value}
                    href={{
                      pathname: "/produk",
                      query: cat.value ? { kategori: cat.value } : {},
                    }}
                    scroll={false}
                    className={`flex items-center gap-2 flex-col bg-black ring-2 py-3 lg:w-3/4 w-1/2 rounded transition duration-300 ring-cyan-200 shadow-lg shadow-cyan-400/80 scale-105`}
                  >
                    {cat.icon}
                    <span>{cat.label}</span>
                  </Link>
                );
              })}
            </ul>
              <button
                onClick={() => setOpen(false)}
                className="absolute top-1 right-2 mt-4 p-2 rounded bg-white/20 ring-2 ring-cyan-500 text-white 
                            hover:bg-white/30 hover:ring-cyan-300 
                            hover:shadow-lg hover:shadow-cyan-400/50 
                            transition-all duration-300 ease-in-out hover:scale-105"
                >
                <XMarkIcon className="w-5 h-5" />
                </button>


            </div>
          </BackgroundGradient>
        </div>
      )}
    </>
  );
}
