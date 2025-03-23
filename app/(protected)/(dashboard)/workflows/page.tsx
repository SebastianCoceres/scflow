"use client"

import { useSession } from "next-auth/react"

function Workflows() {
    const session = useSession();
    return (
        <div>
            <h1>Workflows</h1>
            <pre>{JSON.stringify(session, null, 2)}</pre>
        </div>
    )
}

export default Workflows