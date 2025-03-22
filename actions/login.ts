"use server";

import { signIn } from "@/app/auth";
import { DEFAULT_LOGIN_REDIRECT } from "@/app/routes";
import { getUserByEmail } from "@/data/user";
import { sendVerificationEmail } from "@/lib/mail";
import { generateVerificationToken } from "@/lib/tokens";
import { LoginSchema } from "@/schemas";
import { AuthError } from "next-auth";
import { z } from "zod";

export const Login = async (data: z.infer<typeof LoginSchema>) => {
    const validateFields = LoginSchema.safeParse(data);

    if (!validateFields.success) {
        console.error("Error en la validación del login:", validateFields.error);
        return {
            error: validateFields.error.errors.map((err) => err.message).join(", "),
        };
    }

    const { email, password } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (!existingUser || !existingUser.email || !existingUser.password) return {
        error: "No se ha encontrado el usuario",
    }

    if (!existingUser.emailVerified) {
        const verificationToken = await generateVerificationToken(email);
        if (!verificationToken) {
            return {
                error: "Error al generar el token de verificación",
            };
        }
        await sendVerificationEmail(verificationToken.email, verificationToken.token);
        return {
            error: "La cuenta no ha sido verificada. Se ha enviado un correo de verificación",
        };
    }


    try {
        await signIn("credentials", { email, password, redirectTo: DEFAULT_LOGIN_REDIRECT });

    } catch (error) {
        if ((error instanceof AuthError)) {
            const errorCause = error.cause?.err
            const errorMsg = errorCause ? errorCause.toString().split(":")[1].trim() : error;
            return {
                error: `${errorMsg}`,
            }
        }
        // throw error;
    }

    /**
         * Resulta que la función signIn no redirecciona automaticamente al estar encerrada en un try catch
         * Es posible realizar una redireccion manual con useRouter hasta que nextjs cubra este feature
         * https://nextjs.org/docs/app/api-reference/functions/unstable_rethrow
         * 
         * o authjs lo solucione
         *  */

    return {
        success: `Sesión iniciada. Bienvenido`,
    };
};

