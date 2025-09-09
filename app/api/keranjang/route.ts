
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
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
    const sesi = await auth();
    const user_id = sesi?.user?.id;

    const cart = await prisma.cart.findFirst({
      where: { user_id },
      orderBy: { created_at: "desc" },
      include: {
        user: true,
        details: {
          orderBy: { id: "asc" },
          include: { product: true },
        },
      },
    });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Keranjang kosong" },
        { status: 404 }
      );
    }

    const data = {
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

    return NextResponse.json(
      {
        success: true,
        message: "Data keranjang",
        data : serializeBigInt(data),
      },
      { status: 200 }
    );
  } catch (error: any) {
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

    const sudahAda = await prisma.cart.findFirst({
      where: { user_id, status: "pending" },
      include: { details: true },
    });

    if (sudahAda) {
      const existingDetail = sudahAda.details.find(
        (d) =>
          d.product_id === product_id &&
          d.ukuran === ukuran &&
          d.level === level
      );
    
      let updatedCart;
    
      if (existingDetail) {
        updatedCart = await prisma.cart.update({
          where: { id: sudahAda.id },
          data: {
            total_barang: sudahAda.total_barang + jumlah,
            total_harga: new Decimal(sudahAda.total_harga).add(subtotal),
            details: {
              update: {
                where: { id: existingDetail.id },
                data: {
                  jumlah: new Decimal(existingDetail.jumlah).add(jumlah),
                  subtotal: new Decimal(existingDetail.subtotal).add(subtotal),
                },
              },
            },
          },
          include: { details: true },
        });
      } else {
        updatedCart = await prisma.cart.update({
          where: { id: sudahAda.id },
          data: {
            total_barang: sudahAda.total_barang + jumlah,
            total_harga: new Decimal(sudahAda.total_harga).add(subtotal),
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
          include: { details: true },
        });
      }
      return NextResponse.json(
        { success: true, data: serializeBigInt(updatedCart) },
        { status: 200 }
      );
    }
    

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
