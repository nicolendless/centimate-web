import { login } from "@/app/lib/auth"
import { cookies } from "next/headers"

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json()
    const token = await login(username, password)

    const cookieStore = await cookies()
    cookieStore.set({
      name: 'authToken',
      value: token,
      httpOnly: true,
      path: '/',
    })

    return new Response('Login succesfuly', { status: 200 })
  } catch (error) {
    if (error instanceof Error) {
      return new Response(`${error.message}`, { status: 400 })
    }    
  } 
}