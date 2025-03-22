"use server"

import { db } from "@/schemas/db"
import { getUserByEmail } from "@/data/user"
import { getVerificationTokenByToken } from "@/data/verification-token"

export const verifyToken = async (token: string) => {
    const existingToken = await getVerificationTokenByToken(token);

    if (!existingToken) {
        return {
            error: "El token de verificación no es válido."
        }
    };

    const hasExpired = existingToken.expires.getTime() < new Date().getTime();

    if (hasExpired) {
        return {
            error: "El token de verificación ha expirado."
        }
    };

    const existingUser = await getUserByEmail(existingToken.email);

    if (existingUser) {
        await db.user.update({
            where: { id: existingUser.id },
            data: {
                emailVerified: new Date(),
                email: existingToken.email
            },
        });
    };


    await db.verificationToken.delete({
        where: { id: existingToken.id },
    });

    return {
        success: "El correo electrónico ha sido verificado."
    }
}