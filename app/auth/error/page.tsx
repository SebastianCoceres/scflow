import { ErrorCard } from "@/components/auth/error-card";

export default function ErrorPage() {
    return (
        <section className="flex flex-col justify-center items-center" >
            <ErrorCard message="Error al iniciar sesión" />
        </section>
    )
}