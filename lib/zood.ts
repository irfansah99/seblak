import { z } from "zod";

export const signSchema = z
  .object({
    email: z.string().email({ message: "Wajib email" }),
    password: z.string().min(8, "Password harus lebih dari 8 karakter"),
  });
  
export const registerSchema = z
  .object({
    name: z
      .string()
      .min(5, "Nama harus lebih dari 5 karakter")
      .max(50, "Nama terlalu panjang"),
    email: z.string().email({ message: "Wajib email" }),
    password: z.string().min(8, "Password harus lebih dari 8 karakter"),
    confirmpassword: z.string().min(8, "Password harus lebih dari 8 karakter"),
  })
  .refine((data) => data.password === data.confirmpassword, {
    message: "Konfirmasi password tidak sama",
    path: ["confirmpassword"],
  });


  export const produkSchema = z.object({
    name: z
      .string()
      .min(3, "Nama harus lebih dari 3 karakter")
      .max(50, "Nama terlalu panjang"),
    kategori: z.string(),
    price: z.coerce.number().min(1, "Masukkan harga"),
    stok: z.coerce.number().min(1, "Masukkan stok"),
    imageSrc: z
      .instanceof(File, { message: "Harus berupa file" })
      .refine((file) => file.size > 0, {
        message: "Masukan gambar",
      })
      .refine((file) => file.type.startsWith("image/"), {
        message: "File harus berformat image",
      })
      .refine((file) => file.size < 4_000_000, {
        message: "Gambar harus kurang dari 4 MB",
      }),
  });
  


  export const profilSchema = z
    .object({
      name: z
        .string()
        .min(5, "Nama harus lebih dari 5 karakter")
        .max(50, "Nama terlalu panjang"),
      email: z.string().email({ message: "Wajib email" }),
      password: z.string().min(8, "Password harus lebih dari 8 karakter"),
      confirmpassword: z.string().min(8, "Password harus lebih dari 8 karakter"),
  
      image: z
        .instanceof(File, { message: "Harus berupa file" })
        .refine((file) => file.size > 0, {
          message: "Masukan gambar",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "File harus berformat image",
        })
        .refine((file) => file.size < 4_000_000, {
          message: "Gambar harus kurang dari 4 MB",
        }),
    })
    .refine((data) => data.password === data.confirmpassword, {
      message: "Konfirmasi password tidak sama",
      path: ["confirmpassword"],
    });
  