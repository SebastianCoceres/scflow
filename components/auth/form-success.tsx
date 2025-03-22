import { CheckCircle2Icon } from "lucide-react";

interface FormSuccessProps {
    message?: string;
}

export function FormSuccess({ message }: FormSuccessProps) {
    if (!message) return null;
    return (
        <div className="flex items-start gap-x-2 text-sm bg-success/10 rounded-md text-success p-3">
            <CheckCircle2Icon />
            <p>{message}</p>
        </div>
    )
}