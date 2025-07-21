export async function getProduk() {
  const res = await fetch('http://localhost:3000/api/produk');
  const products = await res.json();

  return products;
}
