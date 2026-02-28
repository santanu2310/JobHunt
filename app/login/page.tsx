"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";
import Image from "next/image";

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <form
        action={formAction}
        className="bg-white rounded-2xl shadow-lg p-10 w-full max-w-md flex flex-col items-center gap-6"
      >
        {/* Logo */}
        <Image
          src="/fullLogo.svg"
          alt="JobHunt Logo"
          width={160}
          height={60}
          priority
        />

        {/* Email */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            name="email"
            type="email"
            required
            placeholder="you@example.com"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Password */}
        <div className="w-full">
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            name="password"
            type="password"
            required
            placeholder="••••••••"
            className="w-full px-4 py-3 rounded-lg border border-gray-200 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 placeholder:text-gray-400"
          />
        </div>

        {/* Login Button */}
        <button
          disabled={isPending}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-medium py-3 rounded-lg transition-colors"
        >
          {isPending ? "Signing in..." : "Login"}
        </button>

        {/* Error Message */}
        {state?.error && (
          <p className="text-red-500 text-sm">{state.error}</p>
        )}
      </form>
    </div>
  );
}
