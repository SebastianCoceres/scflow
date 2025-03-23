"use client"

import { useCurrentUser } from "@/hooks/use-current-user";

export default function Page() {
    const user = useCurrentUser();
    return (
        <pre>{JSON.stringify(user, null, 2)}</pre>
    )
}
