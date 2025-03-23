"use client"

import { resetPassword } from "@/actions/passwordReset"
import CardWrapper from "@/components/auth/card-wrapper"
import Spinner from "@/components/common/spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { resetPasswordSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff, MailCheck, UserCheck2 } from "lucide-react"
import Link from "next/link"
import { useRouter, useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Separator } from "../ui/separator"
import { useAuthForm } from "./auth-form"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import { useCallback } from "react"
import { FeedbackCodes } from "@/lib/errors"


function ResetPasswordForm() {
    const { state, dispatch, isPending, startTransition, showPassword, setShowPassword } = useAuthForm()

    const form = useForm<z.infer<typeof resetPasswordSchema>>({
        resolver: zodResolver(resetPasswordSchema),
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    })
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    const onSubmit = useCallback((data: z.infer<typeof resetPasswordSchema>) => {
        if (!token) {
            dispatch({ type: "error", error: FeedbackCodes.TOKEN_ERRORS.NOT_FOUND });
            return
        };
        dispatch({ type: "reset" });
        startTransition(async () => {
            const response = await resetPassword(data, token);
            if (!response) return;
            if (response && response.success) {
                dispatch({ type: "success", success: response?.success || "" });
                setTimeout(() => {
                    router.replace("/auth/login");
                }, 2000)
            } else {
                dispatch({ type: "error", error: response?.error || "" });
            };

        });
    }, [token, dispatch, router, startTransition])

    return (
        <CardWrapper
            headerLabel="Restablecer contraseña"
        >
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nueva contraseña</FormLabel>
                                    <FormControl >
                                        <div className="relative">
                                            <Input
                                                className="relative z-0 pr-10"
                                                disabled={isPending}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Contraseña"
                                                {...field}
                                            />
                                            <Button variant={"ghost"} className="absolute right-0 top-1/2 -translate-y-1/2 z-10" type="button" onClick={() => { setShowPassword(prev => !prev) }}>
                                                {showPassword ? <EyeOff /> : <EyeIcon />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirmar nueva contraseña</FormLabel>
                                    <FormControl >
                                        <div className="relative">
                                            <Input
                                                className="relative z-0 pr-10"
                                                disabled={isPending}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Contraseña"
                                                {...field}
                                            />
                                            <Button variant={"ghost"} className="absolute right-0 top-1/2 -translate-y-1/2 z-10" type="button" onClick={() => { setShowPassword(prev => !prev) }}>
                                                {showPassword ? <EyeOff /> : <EyeIcon />}
                                            </Button>
                                        </div>
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    {(state.error) && <FormError code={state.error.code} message={state.error.message} />}
                    {state.success && <FormSuccess code={state.success.code} message={state.success.message} />}
                    <FooterForm />

                </form>
            </Form>
        </CardWrapper>
    )
}

export default ResetPasswordForm

function FooterForm() {
    const { isPending } = useAuthForm()
    return (
        <div className="w-full flex flex-col items-center justify-between gap-4">
            <div className="flex flex-wrap items-center w-full gap-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Spinner /> : (<><MailCheck /> Restaurar contraseña</>)}
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
