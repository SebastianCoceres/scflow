"use client";

import { verifyToken } from "@/actions/verification";
import CardWrapper from "@/components/auth/card-wrapper";
import Spinner from "@/components/common/spinner";
import { Alert } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState, useTransition } from "react";

export const VerificationForm = () => {
    const [isPending, startTransition] = useTransition();
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const token = searchParams.get("token");
    const onSubmit = useCallback(async () => {
        if (!token) {
            setError("No se ha proporcionado un token de verificación.");
            return
        };
        startTransition(async () => {
            const { error } = await verifyToken(token as string);
            if (error) {
                setError(error);
                setSuccess(null);
            } else {
                setError(null);
                setSuccess("¡Tu cuenta ha sido verificada con exito!");
            }
        })


    }, [token])

    useEffect(() => {
        onSubmit();
    }, [onSubmit]);

    return (
        <CardWrapper
            headerLabel="Verificación de cuenta"
        >
            <div className="flex flex-col justify-center items-center space-y-4">
                {error &&
                    <>
                        <Alert variant="destructive" size="sm"><small>{error}</small></Alert>
                        <Button variant="ghost" size={"block"} asChild>
                            <Link href="/auth/login">
                                Volver al inicio
                            </Link>
                        </Button>
                    </>
                }
                {
                    isPending && <>
                        <p>
                            Verificando tu cuenta...
                        </p><Spinner size={48} />
                    </>

                }
                {
                    success &&
                    <>
                        <p>
                            ¡Tu cuenta ha sido verificada con exito!
                        </p>
                        <Button variant="ghost" size={"block"} asChild >
                            <Link href="/">
                                Comenzar en flow
                            </Link>
                        </Button>
                    </>
                }



            </div>

        </CardWrapper >
    );
};