import * as z from "zod"

export const LoginSchema = z.object({
    email: z.string().nonempty({
        message: "El correo electrónico es requerido",
    }).email({
        message: "El correo electrónico no es válido",
    }),
    password: z.string().nonempty({
        message: "La contraseña es requerida",
    }),
})

export const RegisterSchema = z.object({
    email: z.string()
        .email({
            message: "El correo electrónico no es válido",
        }).nonempty({
            message: "El correo electrónico es requerido",
        }),
    password: z.string()
        .nonempty({
            message: "La contraseña es requerida",
        }).min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
    name: z.string()
        .nonempty({
            message: "El nombre es requerido",
        }),
    lastname: z.string()
        .nonempty({
            message: "El Apellido es requerido",
        }),
})

export const ForgotPasswordSchema = z.object({
    email: z.string().email({
        message: "El correo electrónico no es válido",
    }).nonempty({
        message: "El correo electrónico es requerido",
    }),
})

export const resetPasswordSchema = z.object({
    password: z.string()
        .nonempty({
            message: "La contraseña es requerida",
        }).min(8, {
            message: "La contraseña debe tener al menos 8 caracteres",
        }),
    confirmPassword: z.string()
        .nonempty({
            message: "La confirmación de la contraseña es requerida",
        })
}).refine((data) => data.password === data.confirmPassword, {
    message: "Las contraseñas no coinciden",
    path: ["confirmPassword"],
});

