import { NextResponse } from "next/server"

export async function GET() {
    const data =[
        {
            id: 1,
            name: "Seblak Mie",
            slug: "Seblak_Mie",
            kategori: "food",
            price: 48,
            stok: 20,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak",
          },
          {
            id: 2,
            name: "Seblak Komplit",
            slug: "Seblak_Komplit",
            kategori: "food",
            price: 55,
            stok: 15,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak komplit",
          },
          {
            id: 3,
            name: "Seblak Ceker",
            slug: "Seblak_Ceker",
            kategori: "food",
            price: 52,
            stok: 10,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak ceker",
          },
          {
            id: 4,
            name: "Seblak Baso",
            slug: "Seblak_Baso",
            kategori: "food",
            price: 50,
            stok: 12,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak baso",
          },
          {
            id: 5,
            name: "Seblak Original",
            slug: "Seblak_Original",
            kategori: "food",
            price: 45,
            stok: 25,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak original",
          },
          {
            id: 6,
            name: "Seblak Seaafod",
            slug: "Seblak_Seaafod",
            kategori: "food",
            price: 45,
            stok: 25,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak original",
          },
          {
            id: 7,
            name: "Wine",
            slug: "wine",
            kategori: "drink",
            price: 45,
            stok: 25,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak original",
          },
          {
            id: 8,
            name: "es krim",
            slug: "es-krim",
            kategori: "extra",
            price: 45,
            stok: 25,
            imageSrc:
              "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIq9qE58_4YhWA9nfUSMi4LqbK9-PoYknZug&s",
            imageAlt: "seblak original",
          },
    ]
    
    return NextResponse.json(data)
}