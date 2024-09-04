import { NextResponse } from 'next/server';


export function middleware(req) {

    const admin_token = req.cookies.get('yesthisisanotherpaimon');
    const responsable_token = req.cookies.get('responsable_refresh_token');

    const url = req.nextUrl.clone();

    if (url.pathname.startsWith('/admin/login')) {

        if (admin_token) {
            return NextResponse.redirect(new URL('/admin', req.url));
        }
    }

    if (url.pathname.startsWith('/responsable')) {

        if (!responsable_token) {
            return NextResponse.redirect(new URL('/users/etablissement/login', req.url));
        }
    }

    if (url.pathname.startsWith('/admin') && !url.pathname.startsWith('/admin/login')) {

        if (!admin_token) {
            return NextResponse.redirect(new URL('/404', req.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/:path*'],
    // matcher: ['/admin/:path*'],
};
