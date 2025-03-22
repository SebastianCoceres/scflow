import { AuthFormProvider } from "@/components/auth/auth-form";
import ResetPasswordForm from "@/components/auth/reset-password";

export default function ResetPasswordPage() {
    return (
        <AuthFormProvider>
            <ResetPasswordForm />
        </AuthFormProvider>
    )
}
