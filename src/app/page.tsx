import { ExpenseTable } from "./components/ExpenseTable";
import { getExpenses } from "./lib/getExpenses";

const expenses = [
  { id: 1, title: "Cardigan", category: "Clothing", amount: 100, date: "2025-02-26"},
  { id: 2, title: "Cardigan", category: "Clothing", amount: 100, date: "2025-02-26"}
]

export default async function Dashboard({ searchParams }: { searchParams: { page?: string }}) {
  const currentPage = Number(searchParams.page) || 1;
  const data = await getExpenses(currentPage);
  
  return (
    <div className="p-8 max-w-4l mx-auto">
      <ExpenseTable 
        expenses={data.content}
        currentPage={currentPage}
        totalPages={data.totalPages}
      />
    </div>
  );
}
