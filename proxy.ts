import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isAuthPage = 
    req.nextUrl.pathname.startsWith("/login") || 
    req.nextUrl.pathname.startsWith("/register") ||
    req.nextUrl.pathname.startsWith("/forgot-password") ||
    req.nextUrl.pathname.startsWith("/reset-password");
  
  const isProtectedRoute = req.nextUrl.pathname.startsWith("/dashboard");

  if (isAuthPage) {
    // If logged in, don't allow access to login/register/forgot/reset pages
    if (isAuth) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
    return null;
  }

  // Only protect dashboard routes for now
  if (isProtectedRoute && !isAuth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
