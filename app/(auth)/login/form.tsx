"use client";
import Link from "next/link";
import { useState } from "react";
import { signIn, getSession } from "next-auth/react";

export default function FormLogin() {
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setPending(true);
    setError(null);

    const formData = new FormData(e.currentTarget);
    const email = formData.get("email")?.toString() || "";
    const password = formData.get("password")?.toString() || "";

    const res = await signIn("credentials", {
      redirect: false,
      email,
      password,
    });

    if (res?.error) {
      setError("Email atau password salah");
    } else if (res?.ok) {
      const session = await getSession();

      if (session?.user?.role === "user") {
        window.location.href = "/";
      } else {
        window.location.href = "/dashboard";
      }
    }

    setPending(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-4 mb-4 text-sm text-red-500 rounded bg-red-100">
          <span className="font-medium">{error}</span>
        </div>
      )}

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Email
        </label>
        <input
          type="email"
          name="email"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="agung@gmail.com"
        />
      </div>

      <div>
        <label className="block mb-2 text-sm font-medium text-gray-900">
          Password
        </label>
        <input
          type="password"
          name="password"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="********"
          autoComplete="none"
        />
      </div>

      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center hover:to-blue-600"
      >
        {pending ? "Login..." : "Login"}
      </button>

      <p>
        Don't have an account?{" "}
        <Link href="/register" className="text-sm font-light text-blue-500">
          Register
        </Link>
      </p>
    </form>
  );
}
