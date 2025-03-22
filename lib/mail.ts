import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
    const confirmLink = `${process.env.NEXT_PUBLIC_URL}/auth/verify?token=${token}`;

    try {
        const data = await resend.emails.send({
            from: "sc-flow <users@sebastiancoceres.dev>",
            to: email,
            subject: "Confirm your email address",
            text: "Confirm your email address",
            html: `<p>Click <a href="${confirmLink}">here</a> to confirm your email address.</p>`,
        });

        return data
    } catch (error) {
        console.error("Error al enviar el correo de verificación:", error);
    }
}

export const sendPasswordResetEmail = async (email: string, token: string) => {
    const resetLink = `${process.env.NEXT_PUBLIC_URL}/auth/reset-password?token=${token}`;

    try {
        const data = await resend.emails.send({
            from: "sc-flow <users@sebastiancoceres.dev>",
            to: email,
            subject: "Reset your password",
            text: "Reset your password",
            html: `<p>Click <a href="${resetLink}">here</a> to reset your password.</p>`,
        });

        return data
    } catch (error) {
        console.error("Error al enviar el correo de verificación:", error);
    }
}