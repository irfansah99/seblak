"use client";
import { signupCredentials } from "@/lib/action";
import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";

export default function FormRegister() {
  const [state, formAction] = useActionState(signupCredentials, null);
  const {pending} = useFormStatus();
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
          placeholder="Muhammad agung"
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
          placeholder="agung@gmail.com"
        />
        <div aria-live="polite" aria-atomic="true">
          <span className="text-sm text-red-500 mt-2">
            {state?.error?.email}
          </span>
        </div>
      </div>
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
      <button
        type="submit"
        disabled={pending}
        className="w-full text-white bg-blue-700 font-medium rounded px-5 py-2.5 text-center hover:to-blue-600"
      >
        {pending ? "Registering..." : "Register"}
      </button>
      <p>
        Already have an Account?{" "}
        <Link href="/login" className="text-sm font-light text-blue-500">
          Sign in
        </Link>
      </p>
    </form>
  );
}
