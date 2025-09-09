import { prisma } from "@/lib/prisma";
import { supabase } from "@/lib/supabaseClient";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; 
  
  try {
    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          message: "Produk tidak ditemukan",
          data: null,
        },
        { status: 404 }
      );
    }
    const konversi = {
      ...product,
      id: Number(product.id),
      price: product.price ? Number(product.price) : null,
      stok: product.stok ? Number(product.stok) : null,
    };

    return NextResponse.json(
      {
        success: true,
        message: "Detail data produk",
        data: konversi,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching product:", error);
    return NextResponse.json(
      {
        success: false,
        message: error instanceof Error ? error.message : "Gagal mengambil data produk",
      },
      { status: 500 }
    );
  }
}
export async function DELETE( request: Request,
  context: { params: Promise<{ slug: string }> }
) {
  const { slug } = await context.params; 
  try {

    const product = await prisma.product.findUnique({
      where: { slug },
    });

    if (!product) {
      return NextResponse.json(
        { success: false, message: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    const filePath = product.imageSrc.split("/").pop();


    await prisma.product.delete({
      where: { slug },
    });


    if (filePath) {
      const { error: deleteError } = await supabase.storage
        .from("produk")
        .remove([filePath]); 

      if (deleteError) {
        console.error("Hapus gambar gagal:", deleteError.message);
        return NextResponse.json(
          {
            success: true,
            message: "Produk dihapus, tapi gambar gagal dihapus ❌",
          },
          { status: 200 }
        );
      }
    }

    return NextResponse.json(
      { success: true, message: "Produk dan gambar berhasil dihapus ✅" },
      { status: 200 }
    );
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: "Gagal menghapus produk" },
      { status: 500 }
    );
  }
}