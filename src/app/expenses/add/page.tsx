"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { postExpense } from "@/app/lib/expenses";
import { CATEGORIES } from "@/app/lib/categories";

export default function AddExpensePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: "success" | "error"; text: string } | null>(null);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data: any) => {
    setLoading(true);
    setMessage(null);

    const success = await postExpense(data);

    setLoading(false);

    if (success) {
      setMessage({ type: "success", text: "Expense added successfully!" });
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      setMessage({ type: "error", text: "Failed to add expense. Try again." });
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Add Expense</h2>

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
          placeholder="Expense title"
          {...register("title", { required: "Title is required" })}
          className={`p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.title ? "border-red-500" : ""}`}
        />

        <select
          {...register("category", { required: "Category is required" })}
          className={`p-3 border rounded-lg bg-white focus:ring-2 focus:ring-indigo-500 ${errors.category ? "border-red-500" : ""}`}
        >
          <option value="">Select Category</option>
          {CATEGORIES.map((category) => (
            <option key={category} value={category.toUpperCase()}>{category}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Amount (€)"
          {...register("amount", { required: "Amount is required", valueAsNumber: true })}
          className={`p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.amount ? "border-red-500" : ""}`}
        />

        <input
          type="date"
          {...register("date", { required: "Date is required" })}
          className={`p-3 border rounded-lg focus:ring-2 focus:ring-indigo-500 ${errors.date ? "border-red-500" : ""}`}
        />

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="button"
            onClick={() => router.push("/")}
            className="px-4 py-2 border rounded-lg text-gray-600 hover:bg-gray-100"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className={`px-4 py-2 rounded-lg text-white ${
              loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-500"
            }`}
          >
            {loading ? "Adding..." : "Add Expense"}
          </button>
        </div>
      </form>
    </div>
  );
}
