import authConfig from "@/app/auth.config"
import NextAuth, { NextAuthConfig } from "next-auth"
import { NextRequest, NextResponse } from 'next/server'
import { authMiddleware } from "./middlewares/auth"
import { cookiesMiddleware } from "./middlewares/cookies"
import { redirectMiddleware } from "./middlewares/redirect"



export const config = {
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
    ],
}


const { auth } = NextAuth(authConfig)

async function middleware(req: NextRequest) {
    const authResponse = await authMiddleware(req as NextRequest & { auth: NextAuthConfig });
    if (authResponse && authResponse.status !== 200) return authResponse;

    const cookiesResponse = cookiesMiddleware(req);
    if (cookiesResponse && cookiesResponse.status !== 200) return cookiesResponse;

    const redirectResponse = redirectMiddleware(req);
    if (redirectResponse && redirectResponse.status !== 200) return redirectResponse;

    return NextResponse.next();
}



export default auth(middleware);