// app/api/keranjang/route.ts
import { getAllCarts, getFirstCart } from "@/app/components/lib/cart";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

function serializeBigInt(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}

export async function GET(req: NextRequest) {
  try {
    // Ambil ID dari path manual
    const id = req.nextUrl.pathname.split("/").pop();

    if (!id) {
      return NextResponse.json(
        { success: false, message: "ID tidak ditemukan di path" },
        { status: 400 }
      );
    }

    const cart = await prisma.cart.findUnique({
      where: { id: Number(id) },
      include: { details: true },
    });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Keranjang tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: cart });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const { product_id, jumlah, ukuran, level } = await request.json();
    const sesi = await auth();
    const user_id = sesi?.user?.id;

    const product = await prisma.product.findUnique({
      where: { id: product_id },
    });

    if (!product || product.price == null) {
      return NextResponse.json(
        { success: false, message: "Product not found or price is null" },
        { status: 404 }
      );
    }

    const hargaTambahan = ukuran === "reguler" ? 0 : product.price * 0.25;
    const subtotal = product.price * jumlah + hargaTambahan;

    const cart = await prisma.cart.create({
      data: {
        user_id,
        total_barang: jumlah,
        total_harga: subtotal,
        details: {
          create: {
            product_id,
            jumlah,
            subtotal,
            ukuran,
            level,
          },
        },
      },
      include: {
        details: true,
      },
    });

    return NextResponse.json(
      { success: true, data: serializeBigInt(cart) },
      { status: 201 }
    );
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
