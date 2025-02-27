import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

const API_BASE_URL = process.env.API_URL || "http://localhost:8080/api/v1";

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')
  if (!authToken) return NextResponse.json({'error': "Unauthorized"}, { status: 401 });

  const page = request.nextUrl.searchParams.get('page') || '1'
  const apiResponse = await fetch(`${API_BASE_URL}/expenses/?page=${page}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${authToken.value}`,
    },
  })

  if (!apiResponse.ok) {
    return NextResponse.json({ error: 'Failed to fetch expenses' }, { status: apiResponse.status });
  }

  const data = await apiResponse.json()
  return NextResponse.json({ data }, { status: 200 })
}

export async function POST(request: NextRequest) {
  const cookieStore = await cookies()
  const authToken = cookieStore.get('authToken')
  if (!authToken) return NextResponse.json({'error': "Unauthorized"}, { status: 401 });

  if (!authToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const expenseData = await request.json();
  
  const apiResponse = await fetch(`${API_BASE_URL}/expenses`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${authToken.value}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(expenseData.data),
  });

  if (!apiResponse.ok) {
    return NextResponse.json({ error: "Failed to add expense" }, { status: apiResponse.status });
  }

  return NextResponse.json({ message: "Expense added successfully!" }, { status: 200 });
}