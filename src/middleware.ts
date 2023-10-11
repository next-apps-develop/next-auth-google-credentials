import { NextResponse, NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'
import { userSchema } from './schemas/user.schema'

export async function middleware(req: any) {
  const { pathname } = req.nextUrl
  const body = await req.json()
  console.log({ body })
  const token = await getToken({ req, secret: process.env.JWT_SECRET })

  console.log(req.nextUrl.pathname)
  if (req.nextUrl.pathname.startsWith('/dashboard')) {
    if (!token) {
      return NextResponse.redirect(new URL('/', req.url))
    }
  }

  if (req.nextUrl.pathname.startsWith('/api/auth/signup')) {
    try {
      await userSchema.validate(body)
    } catch (error) {
      console.log({ error })
      return NextResponse.json(error, { status: 400 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dashboard', '/api/auth/signup']
}
