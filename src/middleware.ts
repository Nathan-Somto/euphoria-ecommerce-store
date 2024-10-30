import { authConfig } from "@/lib/next-auth"
import NextAuth from "next-auth"
import { adminRoute, isPublicRouteTest, publicRoutes } from "./routes"
// key things to note:
// block users who are not signed in from accessing private routes
// when i access a private route, i should be redirected to the sign in page the route i tried to access
// should be stored in the url as a query parameter called blockedRoute
// if the prefix of that route is /admin, i should be redirected to the admin sign in page
// if i am already signed in, i should not be able to access auth pages
// if i am logged in as a customer i should not be able to access any admin page or route even sign-in.
const { auth } = NextAuth(authConfig)
export default auth((req) => {
    const isLoggedIn = !!req.auth
    const url = req.nextUrl;
    const { isPublicRoute } = isPublicRouteTest(url.pathname);
    const isAdminRoute = url.pathname.startsWith(adminRoute);
    const isAuthRoute = url.pathname.startsWith('/auth');
    let callbackUrl = `${url.pathname}${url.search}`;
    const encodedCallbackUrl = encodeURIComponent(callbackUrl)
    const isRedirecting = url.searchParams.has("blockedRoute")
    if (!isRedirecting) {
        if (isAdminRoute && !isLoggedIn) {
            return Response.redirect(new URL(`/admin/sign-in?blockedRoute=${encodedCallbackUrl}`, url))
        }
        if (!isLoggedIn && !isPublicRoute) {
            return Response.redirect(new URL(`/auth/login?blockedRoute=${encodedCallbackUrl}`, url))
        }
        if (isAuthRoute && isLoggedIn) {
            return Response.redirect(new URL('/', url))
        }
        if (isAdminRoute && req.auth?.user.role !== 'ADMIN') {
            return Response.redirect(new URL('/', url))
        }
    }
})
export const config = {
    matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
}