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

import ButtonAksi from "./button";
 
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TableUsers() {
  const { data, error } = useSWR("/api/user", fetcher);

  if (!data) {
    return "tidak ada User";
  }
  return (
    <>
      <div className="w-full flex">

      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">No</TableHead>
            <TableHead>Nama</TableHead>
            <TableHead >Email</TableHead>
            <TableHead >Role</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.data.map((item: any, index: number) => (
            <TableRow key={item.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell >{item.email}</TableCell>
              <TableCell >{item.role.charAt(0).toUpperCase() + item.role.slice(1)}</TableCell>
              <TableCell className="text-right">
                < ButtonAksi items={item} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
