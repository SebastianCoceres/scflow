import { db } from "@/schemas/db";

export const getUserByEmail = async (email: string) => {
    try {
        const user = await db.user.findUnique({
            where: { email }
        });
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}

export const getUserById = async (id: string) => {
    try {
        const user = await db.user.findUnique({ where: { id } });
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}

export const removeUserById = async (id: string) => {
    try {
        const user = await db.user.delete({ where: { id } });
        return user;
    } catch (error) {
        console.error("Error al obtener el usuario:", error);
        return null;
    }
}