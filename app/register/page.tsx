"use client";
import { useRouter } from "next/navigation";
import React, { ReactHTMLElement, useState } from "react";

function RegisterPage() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const router = useRouter();

  const handleSubmit = async  (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password != confirmPassword) {
      alert("Password does not match");
      return;
    }

    try {
      const res  = await fetch("/api/auth/register",{
        method: "POST",
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify({
            email,
            password
        })
      })

      const data =  await res.json()
      if(!res.ok){
        throw new Error(data.error || "Registration failed")
      }

      console.log(data);
      router.push("/login")
      
    } catch (error) {console.log(error);
    }
  };

  return <div>
    <form onSubmit={handleSubmit} className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
        <h2 className="text-2xl font-bold mb-4">Register</h2>
        <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}

            className="border p-2 rounded"
        />
        <input
            type="password"
            placeholder="Password"
            value={password || ""}
            onChange={e => setPassword(e.target.value)}
            required
            className="border p-2 rounded"
        />
        <input
            type="password"
            placeholder="Confirm Password"
            value={confirmPassword || ""}
            onChange={e => setConfirmPassword(e.target.value)}
            required
            className="border p-2 rounded"
        />
        <button type="submit" className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Register
        </button>
    </form>
  </div>;
}

export default RegisterPage;
