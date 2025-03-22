import { auth } from "@/app/auth";

async function HomePage() {
    const session = await auth();
    return (
        <>
            {JSON.stringify(session, null, 2)}
        </>
    )
}

export default HomePage
