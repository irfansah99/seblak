"use server";

import { redirect } from "next/navigation";
import { prisma } from "./prisma";
import { produkSchema, profilSchema, registerSchema, signSchema } from "./zood";
import { hashSync } from "bcrypt-ts";
import { signIn } from "@/auth";
import { AuthError } from "next-auth";
import { supabase } from "./supabaseClient";

export const signupCredentials = async (
  prefState: unknown,
  formData: FormData
) => {
  // Validasi input
  const validatedFields = registerSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, password, email } = validatedFields.data;
  const hashedPassword = hashSync(password, 10); // saltRounds 10

  try {
    await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Gagal register" };
  }

  redirect("/login");
};

export const loginCredentials = async (
  prefState: unknown,
  formData: FormData
) => {
  const validatedFields = signSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { password, email } = validatedFields.data;

  try {
    await signIn("credentials", { email, password, redirectTo: "/" });
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { message: "invalid credentials" };
        default:
          return { message: "something went wrong" };
      }
    }
    throw error;
  }
};
export const produkCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  // Validasi form
  const validatedFields = produkSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, kategori, price, stok, imageSrc } = validatedFields.data;

  try {

    const file = imageSrc as File;


    const safeFileName = file.name.replace(/\s+/g, "");
    
    const fileName = `${Date.now()}-${safeFileName}`;
    
    const { data, error } = await supabase.storage
      .from("produk")
      .upload(fileName, file);
    

    if (error) {
      console.error("Upload gagal:", error.message);
      return { message: "Upload gambar gagal" };
    }

    const { data: publicUrlData } = supabase.storage
      .from("produk")
      .getPublicUrl(fileName);

    const imageUrl = publicUrlData.publicUrl;
    const slug = name.replace(/\s+/g, "_");

    await prisma.product.create({
      data: {
        name,
        slug ,
        kategori,
        price,
        stok,
        imageSrc: imageUrl, 
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Gagal tambah produk" };
  }

  redirect("/kelola_produk");
};

export const editprodukCredentials = async (
  prevState: unknown,
  formData: FormData
) => {
  const validatedFields = produkSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, kategori, price, stok, imageSrc } = validatedFields.data;
  const oldSlug = formData.get("oldSlug") as string;

  try {
    let imageUrl: string | undefined;
  
    if (imageSrc instanceof File && imageSrc.size > 0) {
      const safeFileName = imageSrc.name.replace(/\s+/g, "");
      const fileName = `${Date.now()}-${safeFileName}`;
      const oldImg = formData.get("oldImg") as string; 
  
      if (oldImg) {
        await supabase.storage.from("produk").remove([oldImg]);
      }
  

      const { error } = await supabase.storage
        .from("produk")
        .upload(fileName, imageSrc, { upsert: true });
  
      if (error) {
        console.error("Upload gagal:", error.message);
        return { message: "Upload gambar gagal" };
      }
  
      const { data: publicUrlData } = supabase.storage
        .from("produk")
        .getPublicUrl(fileName);
  
      imageUrl = publicUrlData.publicUrl;
    }
  

    const slug = name.replace(/\s+/g, "_");

    await prisma.product.update({
      where: { slug : oldSlug }, 
      data: {
        name,
        slug,
        kategori,
        price,
        stok,
        ...(imageUrl && { imageSrc: imageUrl }),
      },
    });
  } catch (error) {
    console.error(error);
    return { message: "Gagal update produk" };
  }

  redirect("/kelola_produk");
};

export const profilCredentials = async (
  prefState: unknown,
  formData: FormData
) => {
  // Validasi input
  const validatedFields = profilSchema.safeParse(
    Object.fromEntries(formData.entries())
  );

  if (!validatedFields.success) {
    return {
      error: validatedFields.error.flatten().fieldErrors,
    };
  }

  const { name, password, email, image } = validatedFields.data;
  const hashedPassword = hashSync(password, 10); 
  const userId = formData.get("userId") as string;
  try {
    let imageUrl: string | undefined;
  
    if (image instanceof File && image.size > 0) {
      const safeFileName = image.name.replace(/\s+/g, "");
      const fileName = `${Date.now()}-${safeFileName}`;
      const oldImg = formData.get("oldImg") as string; 

  
      if (oldImg) {
        await supabase.storage.from("produk").remove([oldImg]);
      }
  

      const { error } = await supabase.storage
        .from("produk")
        .upload(fileName, image, { upsert: true });
  
      if (error) {
        console.error("Upload gagal:", error.message);
        return { message: "Upload gambar gagal" };
      }
  
      const { data: publicUrlData } = supabase.storage
        .from("produk")
        .getPublicUrl(fileName);
  
      imageUrl = publicUrlData.publicUrl;
    }
    await prisma.user.update({
      where: { id : userId}, 
      data: {
        name,
        email,
        password: hashedPassword,
        ...(imageUrl && { image: imageUrl }),
      },
    });
    return { success: true, signout: true };
  } catch (error) {
    console.error(error);
    return { message: "Gagal update" };
  }

  
};