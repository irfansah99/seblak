import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";



export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;
    const userId = id;

    // 🔹 Ambil data body
    const body = await req.json();
    const { role: newRole } = body; // ambil field "role"

    if (!newRole) {
      return NextResponse.json(
        { success: false, message: "Role tidak boleh kosong" },
        { status: 400 }
      );
    }

    const updateUser = await prisma.user.update({
      where: { id: userId },
      data: { role: newRole },
    });

    return NextResponse.json(
      { success: true, data: serializeBigInt(updateUser) },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, message: String(error) },
      { status: 500 }
    );
  }
}
function serializeBigInt(obj: any) {
    return JSON.parse(
      JSON.stringify(obj, (key, value) =>
        typeof value === "bigint" ? value.toString() : value
      )
    );
  }