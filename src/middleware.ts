import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

//token must be validated here - encryption, decryption will be here
 
export function middleware(request: NextRequest) {
  //we have couple of paths which are public paths - login, signup. If somebody has token he must not be able to have to those public paths.
  //There are some paths which are protected paths - profile. If somebody is not loggedIn(he will not have token) he should not be seeing profile page.

  //So to operate above - we need to findout user is in what path - for that we will use the request body to find out in which path the user is:
    const path = request.nextUrl.pathname;

  //Declaring which path are public and which are not
    const isPublicPath = path == '/login' || path == '/signup' || path == '/verifyemail'; //this should not be visible to somebody who has token

    //Extracting the user's token:
    const token = request.cookies.get('token')?.value || ''; //it is possible we have token value or not. So if the token has value we extract the value via request.cookies.get('token')?.value and if it's empty we can provide the value of empty string like this - || ''

    //if the path is public and not have token then he can access signup and login otherwise if the path is public and has token then he shouldnot access to signup and login pages
    if(isPublicPath && token){
        //shouldnot have access to signup and login page
        return NextResponse.redirect(new URL('/profile', request.nextUrl)) //request.nextUrl - so the user move automatically to the nextUrl that is /profile in this case
    }

    //if the path is not public and not have token then user should go the the login first
    if(!isPublicPath && !token) {
        return NextResponse.redirect(new URL('/login', request.nextUrl));
    }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    '/',
    '/profile/:path*',
    '/login',
    '/signup',
    '/verifyemail',
  ]
}