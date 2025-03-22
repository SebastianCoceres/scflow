import { TriangleAlertIcon } from "lucide-react";

interface FormErrorProps {
    message?: string;
}

export function FormError({ message }: FormErrorProps) {
    if (!message) return null;
    return (
        <div className="flex items-start gap-x-2 text-sm bg-destructive/10 rounded-md text-destructive p-3">
            <TriangleAlertIcon />
            <p>{message}</p>
        </div>
    )
}