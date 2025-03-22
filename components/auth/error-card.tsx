
import { TriangleAlert } from "lucide-react";
import { Button } from "../ui/button";
import CardWrapper from "./card-wrapper";
import Link from "next/link";
import { Separator } from "../ui/separator";
import { Alert } from "../ui/alert";

export function ErrorCard({ message }: { message: string }) {
    return (
        <CardWrapper
            headerLabel={<><TriangleAlert className="fill-red-200 stroke-red-600" /> Algo salio mal</>}
        >
            <Alert variant="destructive" size="sm"><small>No pudimos procesar tu solicitud, por favor intenta nuevamente</small></Alert>
            <p className="my-4">{message}</p>

            <Separator className="my-4" />
            <Button variant="outline" className="w-full" asChild>
                <Link href="/">Volver al inicio</Link>
            </Button>
        </CardWrapper>
    );
}