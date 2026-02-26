import { auth } from "@/auth";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isAuthRoute = req.nextUrl.pathname.startsWith("/login");
  const isAdminRoute = req.nextUrl.pathname.startsWith("/admin");

  // Redirect unauthenticated users trying to access an admin route
  if (isAdminRoute && !isLoggedIn) {
    return Response.redirect(new URL("/login", req.nextUrl));
  }

  // Optional: Redirect already authenticated users away from the login page
  if (isAuthRoute && isLoggedIn) {
    return Response.redirect(new URL("/admin", req.nextUrl));
  }
});

// Configure the proxy to run on all routes except static files and APIs
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
