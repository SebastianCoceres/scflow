import { NextResponse, NextRequest } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function cookiesMiddleware(req: NextRequest) {
    const response = NextResponse.next();
    response.cookies.set('sc-flow', '1', { expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 365) });
    return response;
}