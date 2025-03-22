"use server";

import { RegisterSchema } from "@/schemas";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { db } from "@/schemas/db";
import { getUserByEmail } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";

export const Register = async (data: z.infer<typeof RegisterSchema>) => {
    const validateFields = RegisterSchema.safeParse(data);

    if (!validateFields.success) {
        console.error("Error en la validación del registro:", validateFields.error);
        return {
            success: false,
            error: validateFields.error.errors.map((err) => err.message).join(", "),
        };
    }

    const { email, password, name, lastname } = validateFields.data;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const existingUser = await getUserByEmail(email);

    if (existingUser) {
        return {
            success: false,
            error: "El correo electrónico ya está registrado.",
        };
    }

    await db.user.create({
        data: {
            email,
            password: hashedPassword,
            name,
            lastname
        },
    });

    const verificationToken = await generateVerificationToken(email);
    console.log(verificationToken);

    if (!verificationToken) {
        return {
            success: false,
            error: "Error al generar el token de verificación",
        };
    }

    await sendVerificationEmail(verificationToken.email, verificationToken.token);

    return {
        success: true,
        data: { message: `Email de verificación enviado a ${email}` },
    };
};
