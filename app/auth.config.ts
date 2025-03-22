import Credentials from "next-auth/providers/credentials"
import type { NextAuthConfig } from "next-auth"
import bcrypt from "bcryptjs"

import { LoginSchema } from "@/schemas"
import { getUserByEmail } from "@/data/user"

export default {
    providers: [
        Credentials({
            async authorize(credentials) {
                const validateFields = LoginSchema.safeParse(credentials);

                if (!validateFields.success) {
                    throw new Error(`${validateFields.error.errors.map((err) => err.message).join(", ")}`);
                    console.error("Error en la validación del login:", validateFields.error);
                    return null
                }
                const { email, password } = validateFields.data;

                const user = await getUserByEmail(email);
                if (!user || !user.password) {
                    throw new Error("No se ha encontrado el usuario");
                    return null
                };

                const isPasswordValid = await bcrypt.compare(password, user.password);
                if (!isPasswordValid) {
                    throw new Error("Contraseña incorrecta");
                    return null
                };

                return user
            }
        })
    ]
} satisfies NextAuthConfig