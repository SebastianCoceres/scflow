"use server"

import { getUserByEmail } from "@/data/user"
import { sendPasswordResetEmail } from "@/lib/mail"
import { generatePasswordResetToken } from "@/lib/tokens"
import { ForgotPasswordSchema } from "@/schemas"
import { z } from "zod"

export const passwordRecover = async (values: z.infer<typeof ForgotPasswordSchema>) => {
    const validateFields = ForgotPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: validateFields.error.errors.map((err) => err.message).join(", "),
        };
    }

    const { email } = validateFields.data;

    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        const passwordResetToken = await generatePasswordResetToken(email);
        if (!passwordResetToken) {
            return {
                error: "Error al generar el token de verificación",
            };
        }

        await sendPasswordResetEmail(passwordResetToken.email, passwordResetToken.token);
    }

    return {
        success: `Si el correo está registrado recibirá un correo de recuperación de contraseña`
    }

}