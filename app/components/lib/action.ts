"use server";

import { prisma } from "@/lib/prisma";
import { Decimal } from "@prisma/client/runtime/library";
import { revalidatePath } from "next/cache";

export const deleteCartDetail = async (id: number) => {
  try {

    const cartDetail = await prisma.cart_detail.findUnique({
      where: { id },
      include: { cart: true }, 
    });

    if (!cartDetail) {
      return { success: false, message: "Detail keranjang tidak ditemukan" };
    }

    const cartId = cartDetail.cart_id;
    const jumlahHapus = cartDetail.jumlah;
    const subtotalHapus = cartDetail.subtotal;

    // 2. Hapus cart_detail
    await prisma.cart_detail.delete({ where: { id } });

    // 3. Update total_barang & total_harga di cart
    await prisma.cart.update({
      where: { id: cartId },
      data: {
        total_barang: (cartDetail.cart.total_barang || 0) - jumlahHapus,
        total_harga: new Decimal(cartDetail.cart.total_harga || 0).minus(subtotalHapus),
      },
    });

    // 4. Revalidate path agar Server Component navbar & halaman cart update
    revalidatePath("/keranjang");

    return { success: true, message: "Item berhasil dihapus" };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Gagal menghapus item" };
  }
};
