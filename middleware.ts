import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "./auth";

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;
  const sesi = await auth()
  const protectedPaths = ["/produk", "/keranjang", "/transaksi"];
  if (protectedPaths.some(path => pathname.startsWith(path)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if ((pathname === "/login" || pathname === "/register") && token) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  if (
    ["/dashboard", "/kelola_produk", "/kelola_user"].some(path =>
      pathname.startsWith(path)
    ) && sesi?.user?.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/", req.url));
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/login","/register", "/produk", "/keranjang", "/dashboard", "/kelola_produk" , "/kelola_user", "/transaksi"],
};
