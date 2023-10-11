import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    console.log('first')
    const requestHeaders = new Headers(req.headers)
    requestHeaders.set('x-url', req.url)
    if (req.nextUrl.pathname.startsWith('/fms/')) {
      return NextResponse.next({
        request: {
          // Apply new request headers
          headers: requestHeaders
        }
      })
    }
  },
  {
    callbacks: {
      authorized: ({ token }) => {
        console.log({token})
        if (token) {
          return true
        }
        return false
      }
    }
  }
)

export const config = {
  matcher: ['/dashboard']
}
