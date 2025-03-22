"use client"

import { Login } from "@/actions/login"
import CardWrapper from "@/components/auth/card-wrapper"
import Spinner from "@/components/common/spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { LoginSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff, UserCheck2, UserPlus } from "lucide-react"
import Link from "next/link"
import { useSearchParams, useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Separator } from "../ui/separator"
import { useAuthForm } from "./auth-form"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"


function LoginForm() {
    const { state, dispatch, isPending, showPassword, setShowPassword, startTransition } = useAuthForm()

    const form = useForm<z.infer<typeof LoginSchema>>({
        resolver: zodResolver(LoginSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    })
    const router = useRouter();
    const searchParams = useSearchParams()
    const urlError = searchParams.get("error")


    const onSubmit = (data: z.infer<typeof LoginSchema>) => {
        dispatch({ type: "reset" }); // Limpiar estado antes de nueva solicitud
        startTransition(async () => {
            const response = await Login(data);

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
            headerLabel="¡Bienvenido!"
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
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Contraseña</FormLabel>
                                    <FormControl >
                                        <div className="relative">
                                            <Input
                                                className="relative z-0 pr-10"
                                                disabled={isPending}
                                                type={showPassword ? 'text' : 'password'}
                                                placeholder="Contraseña"
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
                    {(state.error || urlError) && <FormError message={state.error ? state.error : urlError ? urlError : ""} />}
                    {state.success && <FormSuccess message={state.success} />}
                    <FooterForm />

                </form>
            </Form>
        </CardWrapper>
    )
}

export default LoginForm

function FooterForm() {
    const { isPending } = useAuthForm()
    return (
        <div className="w-full flex flex-col items-center justify-between gap-4">
            <div className="flex flex-wrap items-center w-full gap-4">
                <Button type="submit" className="w-full" disabled={isPending}>
                    {isPending ? <Spinner /> : (<><UserCheck2 /> Iniciar sesión</>)}
                </Button>
                <Button className="w-full" variant={"ghost"} asChild>
                    <Link href="/auth/forgot-password">¿Olvidaste tu contraseña?
                    </Link>
                </Button>
            </div>
            <Separator />
            <Button size={"block"} variant={"outline"} asChild className="hover:shadow-lg dark:shadow-neutral-50/5">
                <Link href={"/auth/register"}>
                    <UserPlus /> ¿No tienes cuenta?
                </Link>
            </Button>
        </div>
    )
}
