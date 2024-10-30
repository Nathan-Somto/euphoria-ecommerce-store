export const publicRoutes = [
    /^\/auth/,                     // matches anything that starts with /auth
    /^\/$/,                        // matches the home page '/'
    /^\/admin\/sign-in$/,          // matches the admin sign-in page '/admin/sign-in'
    /^\/products/,                 // matches any route starting with /products
    /^\/api\/auth/,                // matches any route starting with /api/auth i.e for next
];

export function isPublicRouteTest(pathname: string): { isPublicRoute: boolean } {
    return ({ isPublicRoute: publicRoutes.some((route) => route.test(pathname)) });
}
export const adminRoute = '/admin'