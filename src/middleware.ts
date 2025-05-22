import { getToken } from "next-auth/jwt"
import { NextRequest, NextResponse as Response } from "next/server"
import { adminRoute, publicRoutes, RouteTest } from "./routes"
import { getCountryCode } from "./utils/getCountryCode"
import { setCountryCookie } from "./utils/setCountryCookie"
// key things to note:
// block users who are not signed in from accessing private routes
// when i access a private route, i should be redirected to the sign in page the route i tried to access
// should be stored in the url as a query parameter called blockedRoute
// if the prefix of that route is /admin, i should be redirected to the admin sign in page
// if i am already signed in, i should not be able to access auth pages
// if i am logged in as a customer i should not be able to access any admin page or route even sign-in.

export default async function middleware(req: NextRequest) {
    const token = await getToken({
        req,
        secret: process.env.AUTH_SECRET,
        cookieName: process.env.NEXTAUTH_COOKIE_NAME,
    })
    const isLoggedIn = !!token;
    const url = req.nextUrl;
    const { isRoute: isPublicRoute } = RouteTest(publicRoutes, url.pathname);
    const isAdminRoute = url.pathname.startsWith(adminRoute);
    const isAuthRoute = url.pathname.startsWith('/auth');
    let callbackUrl = `${url.pathname}${url.search}`;
    let countryCode = req.cookies.get('x-country-code')?.value;
    if (countryCode === undefined) {
        countryCode = await getCountryCode(req);
    }
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    const isRedirecting = url.searchParams.has("blockedRoute")
    console.log("the country code is", countryCode);
    if (!isRedirecting) {
        if (isAdminRoute && !isLoggedIn) {
            return setCountryCookie(
                Response.redirect(new URL(`/admin/sign-in?blockedRoute=${encodedCallbackUrl}`, url)),
                countryCode
            );
        }
        if (!isLoggedIn && !isPublicRoute) {
            return setCountryCookie(
                Response.redirect(new URL(`/auth/login?blockedRoute=${encodedCallbackUrl}`, url)),
                countryCode
            );
        }
        if (isAuthRoute && isLoggedIn) {
            return setCountryCookie(Response.redirect(new URL("/", url)), countryCode);
        }
    }
    const requestHeaders = new Headers(req.headers);
    requestHeaders.set('x-pathname', url.pathname);
    const response = Response.next({
        request: {
            headers: requestHeaders
        }
    })
    return setCountryCookie(response, countryCode);
}
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}