import { getPasswordResetTokenByEmail } from "@/data/password-reset-token";
import { getVerificationTokenByEmail } from "@/data/verification-token";
import { db } from "@/schemas/db";
import { v4 as uuidv4 } from "uuid";

export const generateVerificationToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000); // 1 hour from now

    const existintToken = await getVerificationTokenByEmail(email);
    if (existintToken) {
        await db.verificationToken.delete({
            where: { id: existintToken.id },
        })
    }

    const verificationToken = await db.verificationToken.create({
        data: { token, email, expires },
    });

    return verificationToken;

};

export const generatePasswordResetToken = async (email: string) => {
    const token = uuidv4();
    const expires = new Date(new Date().getTime() + 3600 * 1000);

    const existintToken = await getPasswordResetTokenByEmail(email);
    if (existintToken) {
        await db.passwordResetToken.delete({
            where: { id: existintToken.id },
        })
    }

    const passwordResetToken = await db.passwordResetToken.create({
        data: { token, email, expires },
    });

    return passwordResetToken;
}

