"use client"

import { Register } from "@/actions/register"
import CardWrapper from "@/components/auth/card-wrapper"
import Spinner from "@/components/common/spinner"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RegisterSchema } from "@/schemas"
import { zodResolver } from "@hookform/resolvers/zod"
import { EyeIcon, EyeOff, UserPlus, UserSearch } from "lucide-react"
import { redirect } from "next/navigation"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAuthForm } from "./auth-form"
import { FormError } from "./form-error"
import { FormSuccess } from "./form-success"
import Link from "next/link"
import { Separator } from "../ui/separator"


function RegisterForm() {
    const { state, dispatch, isPending, showPassword, setShowPassword, startTransition } = useAuthForm()
    const form = useForm<z.infer<typeof RegisterSchema>>({
        resolver: zodResolver(RegisterSchema),
        defaultValues: {
            name: "",
            lastname: "",
            email: "",
            password: "",
        },
    })

    const onSubmit = (data: z.infer<typeof RegisterSchema>) => {
        dispatch({ type: "reset" }); // Limpiar estado antes de nueva solicitud
        startTransition(async () => {
            const response = await Register(data);

            if (response.success) {
                dispatch({ type: "success", success: response.data?.message || "" });
                redirect("/auth/login");
            } else {
                dispatch({ type: "error", error: response?.error || "" });
            }
        });
    };

    return (
        <CardWrapper
            headerLabel="Crea tu cuenta">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <div className="space-y-2">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Nombre</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isPending}
                                            placeholder="Nombre"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="lastname"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Apellido</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="text"
                                            disabled={isPending}
                                            placeholder="Apellido"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
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
                    {state.error && <FormError message={state.error} />}
                    {state.success && <FormSuccess message={state.success} />}
                    <FooterForm />
                </form>
            </Form>
        </CardWrapper>
    )
}

export default RegisterForm

function FooterForm() {
    const { isPending } = useAuthForm()
    return (
        <div className="w-full flex flex-col items-center justify-between gap-4">
            <div className="flex flex-wrap items-center w-full gap-4">
                <Button type="submit" size={"block"} disabled={isPending}>
                    {isPending ? <Spinner /> : (<><UserPlus /> Registrarse</>)}
                </Button>
            </div>
            <Separator />
            <Button size={"block"} variant={"outline"} asChild>
                <Link href={"/auth/login"}>
                    <UserSearch /> ¿Ya tienes una cuenta?
                </Link>
            </Button>
        </div>
    )
}