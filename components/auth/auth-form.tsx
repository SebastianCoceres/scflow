"use client"

import { createContext, useContext, useReducer, useState, useTransition } from "react"

interface State {
    success: string | null;
    error: string | null;
}

type Action =
    | { type: "success"; success: string }
    | { type: "error"; error: string }
    | { type: "reset" };

const reducer = (state: State, action: Action): State => {
    switch (action.type) {
        case "success":
            return { success: action.success, error: null };
        case "error":
            return { success: null, error: action.error };
        case "reset":
            return { success: null, error: null };
        default:
            throw new Error("Unknown action type");
    }
};

type AuthFormContext = {
    state: State;
    dispatch: React.Dispatch<Action>;
    isPending: boolean;
    showPassword: boolean;
    setShowPassword: React.Dispatch<React.SetStateAction<boolean>>;
    startTransition: React.TransitionStartFunction
}

const AuthFormContext = createContext<AuthFormContext | null>(null)

export function useAuthForm() {
    const context = useContext(AuthFormContext)
    if (!context) {
        throw new Error("useAuthForm must be used within a LoginFormProvider.")
    }

    return context
}

export function AuthFormProvider({ children }: { children: React.ReactNode }) {
    const initialState: State = { success: null, error: null };
    const [state, dispatch] = useReducer(reducer, initialState)
    const [isPending, startTransition] = useTransition()
    const [showPassword, setShowPassword] = useState(false)
    return (
        <AuthFormContext.Provider value={{ state, dispatch, isPending, showPassword, setShowPassword, startTransition }}>
            {children}
        </AuthFormContext.Provider>
    )
}

