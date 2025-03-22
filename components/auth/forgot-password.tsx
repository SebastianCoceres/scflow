"use client"

import { passwordRecover } from "@/actions/passwordRecover"
import CardWrapper from "@/components/auth/card-wrapper"
import Spinner from "@/components/common/spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { ForgotPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { MailCheck, UserCheck2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Separator } from "../ui/separator"
import { useAuthForm } from "./auth-form"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"


function ForgotPasswordForm() {
    const { state, dispatch, isPending, startTransition } = useAuthForm()

    const form = useForm<z.infer<typeof ForgotPasswordSchema>>({
        resolver: zodResolver(ForgotPasswordSchema),
        defaultValues: {
            email: "",
        },
    })
    const router = useRouter();

    const onSubmit = (data: z.infer<typeof ForgotPasswordSchema>) => {
        dispatch({ type: "reset" }); // Limpiar estado antes de nueva solicitud
        startTransition(async () => {
            const response = await passwordRecover(data);
            if (!response) return;
            if (response && response.success) {
                dispatch({ type: "success", success: response?.success || "" });
                setTimeout(() => {
                    router.refresh();
                }, 2000)
            } else {
                dispatch({ type: "error", error: response?.error || "" });
            };

        });
    };

    return (
        <CardWrapper
            headerLabel="Recuperar contraseña"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Correo Electrónico</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="email"
                                            disabled={isPending}
                                            placeholder="Correo electrónico"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                    </div>
                    {(state.error) && <FormError message={state.error} />}
                    {state.success && <FormSuccess message={state.success} />}
                    <FooterForm />

                </form>
            </Form>
        </CardWrapper>
    )
}

export default ForgotPasswordForm

function FooterForm() {
    const { isPending } = useAuthForm()
    return (
        <div className="w-full flex flex-col items-center justify-between gap-4">
            <div className="flex flex-wrap items-center w-full gap-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Spinner /> : (<><MailCheck /> Enviar correo de recuperación</>)}
                </Button>
            </div>
            <Separator />
            <Button size={"block"} variant={"outline"} asChild className="hover:shadow-lg dark:shadow-neutral-50/5">
                <Link href={"/auth/login"}>
                    <UserCheck2 /> Volver a inicio de sesión
                </Link>
            </Button>
        </div>
    )
}
