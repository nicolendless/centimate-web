export async function getExpenses(page: number) {
  const API_URL = `http://localhost:8080/api/v1/expenses?page=${page}`
  const res = await fetch(API_URL, { cache: "no-store" })

  if (!res.ok) throw new Error("Failed to fetch expenses")

  return res.json()
}

export async function postExpense(expense: {
  title: string;
  category: string;
  amount: string;
  date: string;
}) {
  const response = await fetch("http://localhost:8080/api/v1/expenses", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      ...expense,
      amount: parseFloat(expense.amount),
      category: expense.category.toUpperCase(),
    }),
  });

  return response.ok;
}
