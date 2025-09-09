import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { NextRequest, NextResponse } from "next/server";


export async function GET(
  request: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;

  try {
    const cart = await prisma.cart_detail.findUnique({
      where: { id: BigInt(id) },
    });

    if (!cart) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan", data: null },
        { status: 404 }
      );
    }


    const konversi = bigIntToNumber(cart);

    return NextResponse.json(
      { success: true, message: "Detail data produk", data: konversi },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Gagal mengambil data produk",
      },
      { status: 500 }
    );
  }
}
export async function PATCH(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id: detail_id } = await context.params;
  const { jumlah} = await request.json();

 
  const detail = await prisma.cart_detail.findUnique({
    where: { id: BigInt(detail_id) },
    include: { product: true, cart: true }
  });

  if (!detail) {
    return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
  }

  const { product, cart } = detail;

  if (jumlah < 1) {
    return NextResponse.json({ error: "Jumlah minimal 1" }, { status: 400 });
  }
  if (jumlah > product.stok) {
    return NextResponse.json({ error: "Stok tidak mencukupi" }, { status: 400 });
  }

  const hargaTambahan = detail.ukuran === "reguler" ? 0 : product.price * 0.25;
  const subtotal = (product.price + hargaTambahan) * jumlah;

  const jumlahBaru = jumlah;
  const subtotalBaru = new Decimal(subtotal);

  const totalBarangBaru = (cart.total_barang ?? 0) - detail.jumlah + jumlahBaru;
  const totalHargaBaru = new Decimal(cart.total_harga ?? 0)
    .sub(detail.subtotal)
    .add(subtotalBaru);

await prisma.cart_detail.update({
  where: { id: detail.id },
  data: {
    jumlah: jumlahBaru,
    subtotal: subtotalBaru,
  },
});

const updatedCart = await prisma.cart.update({
  where: { id: cart.id },
  data: {
    total_barang: totalBarangBaru,
    total_harga: totalHargaBaru,
  },
  include: { details: { include: { product: true } } },
});


  return NextResponse.json(
    {
      success: true,
      message: "Data cart updated!",
      data: bigIntToNumber(updatedCart),
    },
    { status: 200 }
  );
}


function bigIntToNumber(obj: any) {
  return JSON.parse(
    JSON.stringify(obj, (_, value) =>
      typeof value === "bigint" ? Number(value) : value
    )
  );
}
