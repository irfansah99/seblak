"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useSWR from "swr";

import { DocumentPlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { ButtonAksi } from "./button";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TableProduct() {
  const { data, error } = useSWR("/api/produk", fetcher);

  if (!data) {
    return "tidak ada Produk";
  }
  return (
    <>
      <div className="w-full flex">
        <Link href={"/kelola_produk/create"} className=" flex items-center gap-2 bg-blue-700 text-white px-2 py-1 rounded hover:scale-110 active:scale-100 hover:bg-blue-500 active:bg-blue-900 transition-all duration-300 delay-200">
          Add Product
          <DocumentPlusIcon className="w-6 h-6" />
        </Link>
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Gambar</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead className="text-center">Harga</TableHead>
            <TableHead className="text-center">Stok</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <img
                  src={item.imageSrc}
                  alt={item.name}
                  className="w-16 h-16 object-cover rounded"
                />
              </TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell className="text-center">$ {item.price}</TableCell>
              <TableCell className="text-center">{item.stok}</TableCell>
              <TableCell className="text-right">
                <ButtonAksi slug={item.slug} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
