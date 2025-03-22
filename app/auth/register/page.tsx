import { AuthFormProvider } from "@/components/auth/auth-form"
import RegisterForm from "@/components/auth/register-form"

function RegisterPage() {
    return (
        <AuthFormProvider>
            <RegisterForm />
        </AuthFormProvider>
    )
}

export default RegisterPage