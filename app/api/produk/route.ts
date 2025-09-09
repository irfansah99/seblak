import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const products = await prisma.product.findMany();

    const konversi = products.map((p) => ({
      ...p,
      id: Number(p.id),
      price: Number(p.price),
    }));

    return NextResponse.json(
      {
        success: true,
        message: "List data produk",
        data: konversi,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Gagal mengambil data produk",
      },
      { status: 500 }
    );
  }
}
