export async function getExpenses(page: number) {
    const API_URL = `http://localhost:8080/api/v1/expenses?page=${page}`;
    const res = await fetch(API_URL, { cache: "no-store" });
  
    if (!res.ok) throw new Error("Failed to fetch expenses");
  
    return res.json();
  }
  