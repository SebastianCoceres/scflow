import { NextResponse, NextRequest } from 'next/server';

export function redirectMiddleware(req: NextRequest) {
    const { nextUrl } = req;
    if (nextUrl.pathname === '/old-route') {
        return NextResponse.redirect(new URL('/new-route', nextUrl));
    }
    return NextResponse.next();
}
