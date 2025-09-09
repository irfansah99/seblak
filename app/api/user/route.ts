import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const users = await prisma.user.findMany();


    return NextResponse.json(
      {
        success: true,
        message: "List data produk",
        data: users,
      },
      { status: 200 }
    );
  } catch (error: unknown) {
    console.error("Error fetching products:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Gagal mengambil data user",
      },
      { status: 500 }
    );
  }
}
