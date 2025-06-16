import "next-auth/jwt"
import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
    interface Session {
      user: {
        id: string;
        name: string;
        email: string;
        role?: 'admin' | 'user'; // ここで追加
      } & DefaultSession["user"];
    }
  
    interface User {
      role?: 'admin' | 'user'; // ここでも追加
    }

    
  }

  declare module "next-auth/jwt" {
    interface JWT {
      role?: "admin" | "user";
    }
  }