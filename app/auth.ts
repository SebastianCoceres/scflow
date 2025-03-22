import { getUserById } from "@/data/user"
import { db } from "@/schemas/db"
import { PrismaAdapter } from "@auth/prisma-adapter"
import { UserRole } from "@prisma/client"
import NextAuth, { type DefaultSession } from "next-auth"
import authConfig from "./auth.config"

declare module "next-auth" {
    interface Session {
        user: {
            lastname: string
            role: UserRole
        } & DefaultSession["user"]
    }
}

export const { auth, handlers, signIn, signOut } = NextAuth({
    pages: {
        signIn: "/auth/login",
        signOut: "/auth/logout",
        error: "/auth/error"
    },
    events: {
        async linkAccount({ user }) {
            await db.user.update({
                where: { id: user.id },
                data: {
                    emailVerified: new Date(),
                },
            })
        }
    },
    callbacks: {
        async signIn({ user, account }) {
            if (!user || !user.id) {
                throw new Error(`Error al obtener el usuario: ${user}`);
            }
            if (account?.provider !== "credentials") {
                console.log("El proveedor de autenticación no es 'credentials'");
                return true
            };

            const userExists = await getUserById(user.id)
            if (!userExists) {
                throw new Error(`El usuario no existe: ${user}")`);
            }
            if (!userExists?.emailVerified) {
                throw new Error("El correo electrónico no ha sido verificado");
            }

            return true
        },
        async session({ token, session }) {
            if (token.lastname && session.user) session.user.lastname = token.lastname as string;
            if (token.role && session.user) session.user.role = token.role as UserRole;
            return session
        },
        async jwt({ token }) {
            if (!token.sub) return token
            const existingUser = await getUserById(token.sub)
            if (!existingUser) return token
            token.lastname = existingUser.lastname
            token.role = existingUser.role
            return token
        }
    },
    adapter: PrismaAdapter(db),
    session: {
        strategy: "jwt"
    },
    ...authConfig,
})  