// lib/cart.ts
import { prisma } from "@/lib/prisma";

export async function getAllCarts() {
  const carts = await prisma.cart.findMany({
    orderBy: { created_at: "desc" },
    include: {
      details: {
        include: { product: true },
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

export async function getFirstCart(userId?: string) {
  const cart = await prisma.cart.findFirst({
    where: { user_id: userId },
    orderBy: { created_at: "desc" },
    include: {
      user: true,
      details: {
        orderBy: { id: "asc" },
        include: { product: true },
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
