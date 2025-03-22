"use server"

import { getPasswordResetTokenByToken } from "@/data/password-reset-token";
import { getUserByEmail } from "@/data/user";
import { resetPasswordSchema } from "@/schemas";
import { db } from "@/schemas/db";
import bcrypt from "bcryptjs";
import { z } from "zod";

export const resetPassword = async (values: z.infer<typeof resetPasswordSchema>, token?: string | null) => {
    if (!token) {
        return {
            error: "No se ha proporcionado un token de recuperación.",
        };
    }
    const validateFields = resetPasswordSchema.safeParse(values);

    if (!validateFields.success) {
        return {
            error: validateFields.error.errors.map((err) => err.message).join(", "),
        };
    }

    const { password } = validateFields.data;

    const existingToken = await getPasswordResetTokenByToken(token);

    if (!existingToken) return {
        error: "El token de verificación no es válido."
    }

    if (existingToken.expires.getTime() < new Date().getTime()) return {
        error: "El token de verificación ha expirado."
    }

    const existingUser = await getUserByEmail(existingToken.email);

    if (!existingUser) return {
        error: ""
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    await db.user.update({
        where: { id: existingUser.id },
        data: {
            password: hashedPassword,
            emailVerified: new Date(),
            email: existingToken.email
        },
    });

    await db.passwordResetToken.deleteMany({
        where: { email: existingToken.email },
    });

    return {
        success: `La contraseña se ha restablecido correctamente.`
    }

}