import { CircleX, HomeIcon, KeyRound, Layers2Icon, ShieldCheckIcon, ShieldQuestion, UserIcon, UserPlusIcon } from "lucide-react";

interface Route {
    href: string;
    label: string;
    icon: React.ComponentType;
    disabled: boolean;
}

export const routes: Route[] = [
    {
        href: "/workflows",
        label: "Workflows",
        icon: Layers2Icon,
        disabled: false
    }
]

export const authRoutes: Route[] = [
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

export const publicRoutes: Route[] = [
    {
        href: "/",
        label: "Home",
        icon: HomeIcon,
        disabled: false
    }
]

export const apiAuthPrefix = "/api/auth/"
export const DEFAULT_LOGIN_REDIRECT = "/"
