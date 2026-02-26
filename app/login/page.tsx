"use client";

import { useActionState } from "react";
import { login } from "@/actions/auth";

export default function SignIn() {
  const [state, formAction, isPending] = useActionState(login, undefined);

  return (
    <form action={formAction}>
      <label>
        Email
        <input name="email" type="email" />
      </label>
      <label>
        Password
        <input name="password" type="password" />
      </label>
      <button disabled={isPending}>
        {isPending ? "Signing in..." : "Sign In"}
      </button>
      {state?.error && (
        <p style={{ color: "red", marginTop: "10px" }}>{state.error}</p>
      )}
    </form>
  );
}
