export const publicRoutes = [
    /^\/auth/,                     // matches anything that starts with /auth
    /^\/$/,                        // matches the home page '/'
    /^\/admin\/sign-in$/,          // matches the admin sign-in page '/admin/sign-in'
    /^\/products/,                 // matches any route starting with /products
    /^\/api\/auth/,                // matches any route starting with /api/auth i.e for next
    /^\/cart/,                      // matches any route starting with /cart
    /^\/404/,                      // matches any route starting with /404
    /^\/style-guide$/,
    /^\/api\/stripe\/webhooks$/   // public for stripe to ping
];
export const privateRoutes = [
    /^\/dashboard/,
    /^\/confirmed-order$/
]
// routes that disabled users can't access
export const disabledUserRoutes = [
    ...privateRoutes,
    /^\/checkout/,
]
export function RouteTest(routes: RegExp[], pathname: string): { isRoute: boolean } {
    return ({ isRoute: routes.some((route) => route.test(pathname)) });
}
export const adminRoute = '/admin'