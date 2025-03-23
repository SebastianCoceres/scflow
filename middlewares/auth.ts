import { apiAuthPrefix, authRoutes, DEFAULT_LOGIN_REDIRECT, publicRoutes } from "@/app/routes";
import { NextAuthConfig } from "next-auth";
// import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

// const secret = process.env.AUTH_SECRET;

export async function authMiddleware(req: NextRequest & { auth: NextAuthConfig }) {
    const { nextUrl } = req
    // const token = await getToken({ req, secret });
    const isLoggedIn = Boolean(req.auth);

    const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
    const isPublicRoute = publicRoutes.some((route: { href: string }) => route.href === nextUrl.pathname);
    const isAuthRoute = authRoutes.some((route: { href: string }) => route.href === nextUrl.pathname);
    const isPublicOrAuthRoute = isPublicRoute || isAuthRoute

    if (isApiAuthRoute) {
        return NextResponse.next();
    }
    if (isAuthRoute && isLoggedIn) {
        return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }

    if (!isLoggedIn && !isPublicOrAuthRoute) {
        return NextResponse.redirect(new URL('/auth/login', nextUrl));
    }

    return NextResponse.next()

}