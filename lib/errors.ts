export interface FeedbackType {
    code: string;
    message: string;
}

export const FeedbackCodes: { [key: string]: { [key: string]: FeedbackType } } = {
    GENERIC_ERROR: {
        UNKNOWN: { code: "GEN-001", message: "Error desconocido." },
        SERVER_ERROR: { code: "GEN-002", message: "Error del servidor." },
        CLIENT_ERROR: { code: "GEN-003", message: "Error del cliente." },
        AUTH_ERROR: { code: "GEN-004", message: "Error de autenticación." },
        VALIDATION_ERROR: { code: "GEN-005", message: "Error de validación." },
    },

    USER_ERRORS: {
        NOT_FOUND: { code: "USR-001", message: "Error al obtener el usuario." },
        EMAIL_NOT_FOUND: { code: "USR-002", message: "El email no existe." },
        EMAIL_ALREADY_REGISTERED: { code: "USR-003", message: "El correo electrónico ya está registrado." },
        EMAIL_NOT_VERIFIED: { code: "USR-004", message: "La cuenta no ha sido verificada." },        
    },

    EMAIL: {
        SENT: { code: "EM-001", message: "El correo electrónico ha sido enviado." },
        NOT_SENT: { code: "EM-002", message: "Error al enviar el correo." },
    },

    TOKEN_ERRORS: {
        GENERATION_FAILED: { code: "TOK-001", message: "Error al generar el token " },
        NOT_FOUND: { code: "TOK-002", message: "Error al obtener el token." },
        NO_TOKEN_PROVIDED: { code: "TOK-003", message: "No se ha proporcionado un token" },
        INVALID: { code: "TOK-004", message: "El token  no es válido." },
        EXPIRED: { code: "TOK-005", message: "El token  ha expirado." },
    },

    SUCCESS_MESSAGES: {
        LOGGED_IN: { code: "SUC-002", message: "Sesión iniciada. Bienvenido." },
        EMAIL_VERIFIED: { code: "SUC-001", message: "El correo electrónico ha sido verificado." },
        PASSWORD_CHANGED: { code: "SUC-000", message: "La contraseña ha sido cambiada." },
    },

    PASSWORD_ERRORS: {
        NO_SAME_PASSWORD: { code: "PWD-001", message: "La nueva contraseña debe ser diferente a la contraseña actual." },
        NOT_MATCH: { code: "PWD-002", message: "Las contraseñas no coinciden." },
        NO_PASSWORD_PROVIDED: { code: "PWD-003", message: "No se ha proporcionado una contraseña." },

    },
};