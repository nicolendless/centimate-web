import Link from "next/link";
import { ExpenseTable } from "@/app/components/ExpenseTable";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api/v1";

export default async function Dashboard({ searchParams }: { searchParams: { page?: string } }) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')

  if (!authToken) {
    throw new Error("Unauthorized - No auth token found");
  }

  const currentPage = Number(searchParams.page) || 1;

  const response = await fetch(`${API_BASE_URL}/expenses?page=${currentPage}`, {
    method: "GET",
    headers: {
      "Authorization": `Bearer ${authToken.value}`,
      "Content-Type": "application/json",
    },
  });

  console.log(authToken);
  if (!response.ok) {
    console.log(response.status)
    throw new Error("Failed to fetch expenses");
  }

  const data = await response.json();

  return (
    <div className="p-8 max-w-4l mx-auto">
      <div className="flex justify-between items-center mb-4 bg-gray-100 p-3 rounded-lg shadow">
        <h2 className="text-xl font-semibold text-gray-800">💸 Centimate 💸</h2>
        <Link
          href="/expenses/add"
          className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-500 shadow flex items-center gap-2"
        >
          + Add Expense
        </Link>
      </div>
      <ExpenseTable 
        expenses={data.content} 
        currentPage={currentPage}
        totalPages={data.totalPages}
      />
    </div>
  );
}
