"use client"

import { redirect } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";

export default function LoginPage() {
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm<{ username: string; password: string }>();

  const onSubmit = async (data: { username: string; password: string }) => {
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json"},
      body: JSON.stringify({ username: data.username, password: data.password }),
    });

    if (!response.ok) setMessage({ type: "error", text: "Invalid credentials. Try again." })

    setMessage({type: "success", text: "Login Successful"})
    redirect('/dashboard')
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Login</h2>

      {message && (
        <div
          className={`p-2 text-sm rounded-md mb-3 ${
            message.type === "success" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"
          }`}
        >
          {message.text}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Username"
          {...register("username", { required: "Username is required" })}
          className={`p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.username ? "border-red-500" : ""}`}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password", { required: "Password is required" })}
          className={`p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.password ? "border-red-500" : ""}`}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="px-4 py-2 rounded-lg text-white bg-indigo-600 hover:bg-indigo-500"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  );

}
