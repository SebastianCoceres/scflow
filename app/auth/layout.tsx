import { ModeToggle } from "@/components/common/theme-mode-toggle"
import Threads from '@/components/backgrounds/Threads';


function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <>
            <div className="fixed inset-0 z-[-1]">
                <Threads
                    amplitude={1.2}
                    distance={0}
                    enableMouseInteraction={false}
                    speed={.5}
                />
            </div>
            <div className="flex flex-col min-h-screen custom-gradient w-full">

                <div className="flex items-center justify-end px-6 py-4 container mx-auto">
                    <ModeToggle />
                </div>
                <div className="flex items-center justify-center flex-1 container py-4 text-accent-foreground">
                    {children}
                </div>
            </div>
        </>

    )
}

export default AuthLayout