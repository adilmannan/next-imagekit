"use client";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function LoginPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    if (result?.error) {
      console.log(result.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-4 max-w-sm mx-auto mt-10"
      >
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border px-2 py-1 rounded w-full"
          />
        </label>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Login
        </button>
      </form>
      <div>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <button
            className="text-blue-600 underline"
            type="button"
            onClick={() => router.push("/register")}
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
