import { ExpenseTable } from "./components/ExpenseTable";

const expenses = [
  { id: 1, title: "Cardigan", category: "Clothing", amount: 100, date: "2025-02-26"},
  { id: 2, title: "Cardigan", category: "Clothing", amount: 100, date: "2025-02-26"}
]

export default function Dashboard() {
  return (
    <div className="p-8 max-w-4l mx-auto">
      <ExpenseTable expenses={expenses}></ExpenseTable>
    </div>
  );
}
