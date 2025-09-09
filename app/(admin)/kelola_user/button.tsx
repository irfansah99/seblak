"use client";
import { useState } from "react";

export default function ButtonAksi({ items }: { items: any }) {
  const [role, setRole] = useState(items.role || "user");
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    const newRole = role === "user" ? "admin" : "user"; 

    try {
      setLoading(true);
      const res = await fetch(`/api/user/${items.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ role: newRole }),
      });

      if (!res.ok) {
        throw new Error("Gagal update role");
      }

      const data = await res.json();
      console.log("Update result:", data);

      setRole(newRole); // update state sesuai respon
      alert(`Berhasil ubah role jadi ${newRole}`);
    } catch (err) {
      console.error("Gagal update:", err);
      alert("Update gagal");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleClick}
        disabled={loading}
        className="bg-blue-700 text-white px-2 py-1 rounded hover:scale-110 active:scale-100 hover:bg-blue-400 active:bg-indigo-500 transition-all duration-300 delay-200 disabled:opacity-50"
      >
        {loading
          ? "Processing..."
          : role === "user"
          ? "Promote jadi Admin"
          : "Turunkan jadi User"}
      </button>
    </div>
  );
}
