import { AuthFormProvider } from "@/components/auth/auth-form"
import LoginForm from "@/components/auth/login-form"

function LoginPage() {
    return (
        <AuthFormProvider>
            <LoginForm />
        </AuthFormProvider>
    )
}

export default LoginPage