import type { NextAuthConfig } from 'next-auth';
 
export const authConfig = {
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user && 'role' in user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token?.role) {
        session.user.role = token.role;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isUser = auth?.user?.role === 'user'
      const isAdmin = auth?.user?.role === 'admin'
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');
      const isAdminDash = nextUrl.pathname.startsWith('/dashboard/admin');

      //ログイン状態のアクセス
      if (isOnDashboard) {
        if (isLoggedIn && isAdmin) return true;
        if (isLoggedIn && isUser){
          if (isAdminDash) return false;
          return true;
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }
      return true;
    },
  },
  providers: [], // Add providers with an empty array for now
} satisfies NextAuthConfig;

