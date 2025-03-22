import { db } from "@/schemas/db";

/**
 * Retrieves a password reset token from the database by its token value.
 *
 * @param token - The token string used to find the corresponding password reset token.
 * @returns The password reset token object if found, otherwise null.
 * @throws Logs an error to the console if there is an issue accessing the database.
 */
export const getPasswordResetTokenByToken = async (token: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findUnique({
            where: { token },
        });
        return passwordResetToken;
    } catch (error) {
        console.error("Error al obtener el token de verificación:", error);
        return null;
    }
};

/**
 * Retrieves a password reset token from the database by its email value.
 *
 * @param email - The email string used to find the corresponding password reset token.
 * @returns The password reset token object if found, otherwise null.
 * @throws Logs an error to the console if there is an issue accessing the database.
 */
export const getPasswordResetTokenByEmail = async (email: string) => {
    try {
        const passwordResetToken = await db.passwordResetToken.findFirst({
            where: { email },
        });
        return passwordResetToken;
    } catch (error) {
        console.error("Error al obtener el token de verificación:", error);
        return null;
    }
};

