import Link from "next/link"


function NotFoundPage() {
    return (
        <div className="w-full flex flex-col items-center justify-center min-h-screen p-4">
            <div className="text-center">
                <h1 className="text-6xl font-bold text-primary mb-4">404</h1>
                <h2 className="text-2xl font-semibold mb-4">Page Not Found</h2>
                <p className="text-muted-foreground max-w-md">
                    The page you are looking for does not exist.

                </p>
                <Link href="/" className="text-primary hover:underline cursor-pointer">
                    Go back to the homepage
                </Link>
            </div>
        </div>
    )
}

export default NotFoundPage