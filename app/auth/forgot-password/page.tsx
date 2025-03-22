import { AuthFormProvider } from "@/components/auth/auth-form"
import ForgotPasswordForm from "@/components/auth/forgot-password"

function page() {
    return (
        <AuthFormProvider>
            <ForgotPasswordForm />
        </AuthFormProvider>
    )
}

export default page