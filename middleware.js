import { NextResponse } from 'next/server';


export function middleware(req) {

    const token = req.cookies.get('yesthisisanotherpaimon');

    const url = req.nextUrl.clone();

    if (url.pathname.startsWith('/admin/login')) {

        if (token) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {

        if (!token) {
            return NextResponse.redirect(new URL('/404', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*'],
};
