"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { signOut } from "next-auth/react";
import Link from "next/link";

export default function LogoutPage() {
    return (
        <section className="flex flex-col justify-center items-center" >
            <Card>
                <CardHeader>
                    <CardTitle>¿Estas seguro que quieres cerrar sesión?</CardTitle>
                </CardHeader>
                <CardContent>
                    <p>Puedes regresar cuando quieras</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <Button variant={"destructive"} onClick={() => signOut()}>
                        Si, cerrar sesión
                    </Button>
                    <Button variant={"outline"} asChild>
                        <Link href="/">Volver al inicio</Link>
                    </Button>
                </CardFooter>
            </Card>

        </section >
    )
}