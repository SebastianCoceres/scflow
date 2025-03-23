import { Button } from "@/components/ui/button"
import Link from "next/link"

async function HomePage() {
    return (
        <main className="flex w-full min-h-screen flex-col items-center justify-center p-24">
            <h1>Home</h1>
            <Button asChild>
                <Link href="/workflows">
                    Comenzar
                </Link>
            </Button>
        </main>
    )
}

export default HomePage
