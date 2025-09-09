import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function getAllCarts() {
  const carts = await prisma.cart.findMany({
    orderBy: { created_at: "desc" },
    include: {
      details: {
        include: {
          product: true,
        },
      },
      transaksi: true,
    },
  });

  return carts.map((p) => ({
    ...p,
    id: Number(p.id),
    total_harga: Number(p.total_harga),
    details: p.details.map((d) => ({
      ...d,
      id: Number(d.id),
      product_id: Number(d.product_id),
      jumlah: Number(d.jumlah),
      subtotal: Number(d.subtotal),
      product: {
        ...d.product,
        id: Number(d.product.id),
        price: Number(d.product.price),
      },
    })),
  }));
}

export async function getFirstCart(userId?:string) {
  const cart = await prisma.cart.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    include: {
      user: true,
      details: {
        orderBy: { id: "asc" },
        include: {
          product: true,
        },
      },
    },
  });

  if (!cart) return null;

  return {
    ...cart,
    id: Number(cart.id),
    total_harga: Number(cart.total_harga),
    details: cart.details.map((d) => ({
      ...d,
      id: Number(d.id),
      product_id: Number(d.product_id),
      jumlah: d.jumlah,
      subtotal: Number(d.subtotal),
      product: {
        ...d.product,
        id: Number(d.product.id),
        price: Number(d.product.price),
      },
    })),
  };
}

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const mode = searchParams.get("mode");

    let data;
    if (mode === "first") {
      data = serializeBigInt(await getFirstCart());
    } else {
      data = serializeBigInt(await getAllCarts());
    }

    return NextResponse.json(
      {
        success: true,
        message: mode === "first" ? "Keranjang terbaru" : "Semua keranjang",
        data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching carts:", error);
    return NextResponse.json(
      {
        success: false,
        message: error.message || "Gagal mengambil data keranjang",
      },
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
  } catch (error) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

function serializeBigInt(obj) {
  return JSON.parse(
    JSON.stringify(obj, (key, value) =>
      typeof value === "bigint" ? value.toString() : value
    )
  );
}
