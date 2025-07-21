export async function getProduk() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/produk`);
  const products = await res.json();

  return products;
}
