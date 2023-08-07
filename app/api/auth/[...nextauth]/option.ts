import NextAuth from "next-auth/next";
import { NextAuthOptions } from "next-auth";
//we are using these three providers for login
import Credentials from "next-auth/providers/credentials";
import GithubProviders from "next-auth/providers/github";
import GoogleProviders from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { compare } from "bcrypt";

import prismadb from "@/lib/prismadb";

export const option: NextAuthOptions = {
  //user input manually
  providers: [
    GithubProviders({
      clientId: process.env.GITHUB_ID || "",
      clientSecret: process.env.GITHUB_SECRET || "",
    }),
    GoogleProviders({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    }),
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password required");
        }

        //find the user from database

        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email,
          },
        });

        if (!user) {
          throw new Error("Email does not exits");
        }

        //check password

        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword || ""
        );

        if (!isCorrectPassword) {
          throw new Error("Incorrect password");
        }

        return user;
      },
    }),
  ],

  pages: {
    signIn: "/auth",
  },

  //it will tell us the log in the terminal it is useful during development
  debug: process.env.NODE_ENV === "development",
  adapter: PrismaAdapter(prismadb),
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
};
