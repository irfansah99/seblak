import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import {  NextResponse } from "next/server";



export async function PATCH(request: Request, context: { params: Promise<{ slug: string }> }) {
    const { slug: productSlug } = await context.params; 
    const { jumlah, ukuran, level } = await request.json(); 
  
    const product = await prisma.product.findUnique({
      where: { slug: productSlug },
    });
    if (!product) {
      return NextResponse.json({ error: "Produk tidak ditemukan" }, { status: 404 });
    }
  
    const cart = await prisma.cart.findFirst({
        orderBy: { created_at: "desc" },
      });
    if (!cart) {
      return NextResponse.json({ error: "Cart tidak ditemukan" }, { status: 404 });
    }
    const hargaTambahan = ukuran === "reguler" ? 0 : product.price * 0.25;
    const subtotal = product.price * jumlah + hargaTambahan;
  

    const existingDetail = await prisma.cart_detail.findFirst({
      where: { cart_id: cart.id, product_id: product.id, ukuran, level },
    });
  
    let updatedCart;
    if (existingDetail) {
        const jumlahSebelumnya = existingDetail.jumlah;
        const hargaSebelumnya: Decimal = existingDetail.subtotal;
      
        const jumlahBaru = jumlahSebelumnya + jumlah;
        const subtotalBaru = hargaSebelumnya.add(new Decimal(subtotal));
      
        // total_barang dan total_harga dari cart lama
        const totalBarangSebelumnya = cart.total_barang ?? 0;
        const totalHargaSebelumnya = new Decimal(cart.total_harga ?? 0);
      
        const totalBarangBaru = totalBarangSebelumnya - jumlahSebelumnya + jumlahBaru;
        const totalHargaBaru = totalHargaSebelumnya.sub(hargaSebelumnya).add(subtotalBaru);
      
        updatedCart = await prisma.cart.update({
          where: { id: cart.id },
          data: {
            total_barang: totalBarangBaru,
            total_harga: totalHargaBaru,
            details: {
              update: {
                where: { id: existingDetail.id },
                data: {
                  jumlah: jumlahBaru,
                  subtotal: subtotalBaru,
                  ukuran,
                  level,
                },
              },
            },
          },
          include: { details: true },
        });
      } else {
        updatedCart = await prisma.cart.update({
          where: { id: cart.id },
          data: {
            total_barang: (cart.total_barang ?? 0) + jumlah,
            total_harga: Number(cart.total_harga ?? 0) + subtotal,
            details: {
              create: {
                product_id: product.id,
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
      {
        success: true,
        message: "Data cart updated!",
        data: serializeBigInt(updatedCart),
      },
      { status: 200 }
    );
  }
  

  function serializeBigInt(obj : any) {
    return JSON.parse(
      JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }