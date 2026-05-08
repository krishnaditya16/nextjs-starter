import { auth } from "@/lib/auth";

export default auth((req) => {
  const isAuth = !!req.auth;
  const isPublicPage = 
    req.nextUrl.pathname.startsWith("/login") || 
    req.nextUrl.pathname.startsWith("/register") || 
    req.nextUrl.pathname.startsWith("/api/auth");

  if (isPublicPage) {
    // If logged in, don't allow access to login/register pages
    if (isAuth && !req.nextUrl.pathname.startsWith("/api/auth")) {
      return Response.redirect(new URL("/dashboard", req.nextUrl));
    }
    return null;
  }

  // Redirect to login if not authenticated
  if (!isAuth) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }
});

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
