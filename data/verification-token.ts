import { db } from "@/schemas/db";

/**
 * Retrieves a verification token from the database by its token value.
 *
 * @param token - The token string used to find the corresponding verification token.
 * @returns The verification token object if found, otherwise null.
 * @throws Logs an error to the console if there is an issue accessing the database.
 */

export const getVerificationTokenByToken = async (token: string) => {
    try {
        const verificationToken = await db.verificationToken.findUnique({
            where: { token },
        });
        return verificationToken;
    } catch (error) {
        console.error("Error al obtener el token de verificación:", error);
        return null;
    }
};

/**
 * Retrieves a verification token from the database by its email value.
 *
 * @param email - The email string used to find the corresponding verification token.
 * @returns The verification token object if found, otherwise null.
 * @throws Logs an error to the console if there is an issue accessing the database.
 */
export const getVerificationTokenByEmail = async (email: string) => {
    try {
        const verificationToken = await db.verificationToken.findFirst({
            where: { email },
        });
        return verificationToken;
    } catch (error) {
        console.error("Error al obtener el token de verificación:", error);
        return null;
    }
};