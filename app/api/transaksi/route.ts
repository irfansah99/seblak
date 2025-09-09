import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";
import { number } from "zod/v4/classic/coerce.cjs";

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


export async function GET() {
  try {
    const cart = await prisma.cart.findMany({
      where: { 
        status: "selesai"
      },
      orderBy: { created_at: "desc" },
      include: {
        user: true,
        details: {
          orderBy: { id: "asc" },
          include: {
            product: true,
          },
        },
        transaksi: {
          where: {
            status: {
              in: ["pending", "proses"], 
            },
          },
        },
      },
    });

    const konversi = cart.map((p) => ({
      ...p,
      id: Number(p.id),
      total_harga: Number(p.total_harga),

      details: p.details.map((d) => ({
        ...d,
        id: Number(d.id),
        subtotal: Number(d.subtotal),
      })),
      transaksi: p.transaksi
      ? {
          ...p.transaksi,
          id: Number(p.transaksi.id),
          total_bayar: Number(p.transaksi.total_bayar),
        }
      : null,
    

    }));

    return Response.json({
      success: true,
      message: "List data Transaksi",
      data: serializeBigInt(konversi),
    });
  } catch (error: any) {
    console.error("Error fetching transaksi:", error);
    return Response.json({
      success: false,
      message: error.message || "Gagal mengambil data transaksi",
      data: [],
    }, { status: 500 });
  }
}



function serializeBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const transaksiid = parseInt(params.id);

    const transaksi = await prisma.transaksi.findUnique({
      where: { id: transaksiid },
      select: { status: true },
    });

    if (!transaksi) {
      return NextResponse.json({ success: false, message: "Transaksi tidak ditemukan" }, { status: 404 });
    }

    let newStatus: string | null = null;
    if (transaksi.status === "pending") newStatus = "proses";
    else if (transaksi.status === "proses") newStatus = "selesai";

    if (!newStatus) {
      return NextResponse.json({ success: false, message: "Status tidak bisa diperbarui" }, { status: 400 });
    }

    const updateTransaksi = await prisma.transaksi.update({
      where: { id: transaksiid },
      data: { status: newStatus },
    });

    return NextResponse.json({ success: true, data: serializeBigInt(updateTransaksi) }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, message: String(error) }, { status: 500 });
  }
}
