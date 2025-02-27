const API_BASE_URL = process.env.API_URL || "http://localhost:8080/api/v1";

export async function login(username: string, password: string) {  
  const response = await fetch(`${API_BASE_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password}),
  })

  if (!response.ok) throw new Error("Invalid credentials")

  const data = await response.json()
  return data.token;
}