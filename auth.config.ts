import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: "/login",
    },
    session: { strategy: "jwt" },
    callbacks: {
        jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.isAdmin = (user as any).isAdmin;
            }
            return token;
        },
        session({ session, token }) {
            if (session.user) {
                (session.user as any).id = token.id as string;
                (session.user as any).isAdmin = token.isAdmin as boolean;
            }
            return session;
        },
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isAuthRoute = nextUrl.pathname.startsWith("/login");
            const isAdminRoute = nextUrl.pathname.startsWith("/admin");

            if (isAdminRoute && !isLoggedIn) {
                return false; // Redirect to signIn page
            }

            if (isAuthRoute && isLoggedIn) {
                return Response.redirect(new URL("/admin", nextUrl));
            }

            return true;
        },
    },
    providers: [], // Providers are added in auth.ts (not Edge-compatible)
} satisfies NextAuthConfig;
