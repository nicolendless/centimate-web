import Link from "next/link";
import { ExpenseTable } from "@/app/components/ExpenseTable";
import { getExpenses } from "@/app/lib/getExpenses";

export default async function Dashboard({ searchParams }: { searchParams: { page?: string }}) {
  const currentPage = Number(searchParams.page) || 1;
  const data = await getExpenses(currentPage);
  
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
