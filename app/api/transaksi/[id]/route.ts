import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";


export async function POST(request: NextRequest) {
  try {
    const { cart_id } = await request.json();

    // Cek cart
    const existingCart = await prisma.cart.findUnique({
      where: { id: cart_id },
    });

    if (!existingCart) {
      return NextResponse.json(
        { success: false, message: "Cart not found" },
        { status: 404 }
      );
    }

    const updatedCart = await prisma.cart.update({
      where: { id: cart_id },
      data: {
        status: "selesai",
        transaksi: {
          create: {
            jumlah: existingCart.total_barang,
            total_bayar: existingCart.total_harga,
            status: "pending",
          },
        },
      },
      include: { transaksi: true },
    });

    return NextResponse.json(
      { success: true, data: serializeBigInt(updatedCart) },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}




function serializeBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
export async function PUT(req: Request, context: { params: Promise<{ id: string }> }) {
  try {
    const { id } = await context.params; // 👈 harus di-await
    const transaksiid = parseInt(id);

    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiid },
      select: { status: true },
    });

    if (!transaksi) {
      return NextResponse.json(
        { success: false, message: "Transaksi tidak ditemukan" },
        { status: 404 }
      );
    }

    let newStatus: string | null = null;
    if (transaksi.status === "pending") newStatus = "proses";
    else if (transaksi.status === "proses") newStatus = "selesai";

    if (!newStatus) {
      return NextResponse.json(
        { success: false, message: "Status tidak bisa diperbarui" },
        { status: 400 }
      );
    }

    const updateTransaksi = await prisma.transaksi.update({
      where: { id: transaksiid },
      data: { status: newStatus },
    });

    return NextResponse.json(
      { success: true, data: serializeBigInt(updateTransaksi) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    );
  }
}
