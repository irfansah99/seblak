import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import ButtonAksi from "./buttonAksi";
import useSWR from "swr";
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function TableTransaksi() {
  const { data, error } = useSWR("/api/transaksi", fetcher);

  const transaksiValid = data?.data?.filter((items: any) => items.transaksi) ?? []
  if(error){
    return "Error";  }
  if (transaksiValid.length === 0) {
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>No</TableHead>
            <TableHead>Pembeli</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-center">Total Beli</TableHead>
            <TableHead className="text-center">Total Bayar</TableHead>
            <TableHead className="text-right">Aksi</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell colSpan={6} className="text-center text-gray-400 italic">
              Tidak ada transaksi
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    );
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">No</TableHead>
          <TableHead>Pembeli</TableHead>
          <TableHead>Status</TableHead>
          <TableHead className="text-center">Total Beli</TableHead>
          <TableHead className="text-center">Total Bayar</TableHead>
          <TableHead className="text-right">Aksi</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.data
          .filter((items: any) => items.transaksi) 
          .map((items: any, index: number) => (
            <TableRow key={items.id ?? index}>
              <TableCell className="font-medium">{index + 1}</TableCell>
              <TableCell>{items.user?.name || "-"}</TableCell>
              <TableCell>{items.transaksi?.status || "-"}</TableCell>
              <TableCell className="text-center">
                {items.transaksi?.jumlah ?? 0}
              </TableCell>
              <TableCell className="text-center">
                {items.transaksi?.total_bayar ?? 0}
              </TableCell>
              <TableCell className="text-right">
                <ButtonAksi items={items} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
}
