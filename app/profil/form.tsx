"use client";
import { profilCredentials } from "@/lib/action";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useActionState, useEffect, useState } from "react";
import { useFormStatus } from "react-dom";

export default function FormProfil({ user }: { user: any }) {
  const [state, formAction] = useActionState(profilCredentials, null);
  const { pending } = useFormStatus();
  const [gambar, Setgambar] = useState(user.image || null);
  const router = useRouter()
  useEffect(() => {
    if (state?.signout) {
      signOut({ callbackUrl: "/login" });
    }
  }, [state]);
  return (
    <form action={formAction} className="space-y-6">
      {state?.message && (
        <div
          className="p-4 mb-4 text-sm text-red-500 rounded bg-red-100"
          role="alert"
        >
          <span className="font-medium">{state.message}</span>
        </div>
      )}
      <input type="hidden" name="oldImg" value={user.image?.split("/").pop()} />
      <input type="hidden" name="userId" value={user.id} />
      <div>
        <label
          htmlFor="name"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Name
        </label>
        <input
          type="text"
          name="name"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          defaultValue={user.name}
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.name}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmpassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Email
        </label>
        <input
          type="email"
          name="email"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          defaultValue={user.email}
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="image"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Gambar
        </label>
        <input
          type="file"
          name="image"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) {
              Setgambar(URL.createObjectURL(file));
            }
          }}
        />
      </div>

      {gambar && (
        <div className="mt-2">
          <img
            src={gambar}
            alt="preview"
            className="w-32 h-32 object-cover rounded"
          />
        </div>
      )}

      <div>
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Password
        </label>
        <input
          type="password"
          name="password"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="********"
          autoComplete="none"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.password}
          </span>
        </div>
      </div>
      <div>
        <label
          htmlFor="confirmpassword"
          className="block mb-2 text-sm font-medium text-gray-900"
        >
          Confirmasi Password
        </label>
        <input
          type="password"
          name="confirmpassword"
          className="bg-gray-50 border border-gray-300 rounded-lg w-full p-2.5"
          placeholder="********"
          autoComplete="none"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.confirmpassword}
          </span>
        </div>
      </div>
      <div className="flex gap-2 justify-center">
        <button
          type="submit"
          disabled={pending}
          className=" text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center hover:to-blue-600"
        >
          {pending ? "Updating..." : "Upddate"}
        </button>
        <button
          onClick={() => router.back()}
          className="text-white bg-red-700 font-medium rounded px-5 py-2.5 text-center hover:bg-red-600"
        >
          Back
        </button>
      </div>
    </form>
  );
}
