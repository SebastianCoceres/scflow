import { CircleX, HomeIcon, KeyRound, Layers2Icon, ShieldCheckIcon, ShieldQuestion, UserIcon, UserPlusIcon } from "lucide-react";

export const routes = [
    {
        href: "/",
        label: "Home",
        icon: HomeIcon,
        disabled: false
    }, {
        href: "/workflows",
        label: "Workflows",
        icon: Layers2Icon,
        disabled: false
    }
]

export const authRoutes = [
    {
        href: "/auth/login",
        label: "Login",
        icon: UserIcon,
        disabled: false
    }, {
        href: "/auth/register",
        label: "Register",
        icon: UserPlusIcon,
        disabled: false
    }, {
        href: "/auth/verify",
        label: "Verify",
        icon: ShieldCheckIcon,
        disabled: false
    }, {
        href: "/auth/forgot-password",
        label: "Forgot Password",
        icon: ShieldQuestion,
        disabled: false
    }, {
        href: "/auth/reset-password",
        label: "Reset Password",
        icon: KeyRound,
        disabled: false
    },
    {
        href: "/auth/error",
        label: "Error",
        icon: CircleX,
        disabled: false
    }
]

export const publicRoutes = [

]

export const apiAuthPrefix = "/api/auth/"
export const DEFAULT_LOGIN_REDIRECT = "/"
