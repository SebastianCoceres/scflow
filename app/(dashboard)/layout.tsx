import Breadcrumbs from '@/components/common/breadcrumbs'
import { DesktopSidebar } from '@/components/common/sidebar/siderbar'
import { ModeToggle } from '@/components/common/theme-mode-toggle'
import { Separator } from '@/components/ui/separator'
import { SidebarTrigger } from '@/components/ui/sidebar'

async function layout({ children }: { children: React.ReactNode }) {
    return (
        <main className='flex min-h-screen w-full'>
            <DesktopSidebar />
            <div className='flex flex-col flex-1 min-h-screen'>
                <header className='flex items-center justify-between px-4 sm:px-6  py-2 sm:py-4 h-[50px] w-full mx-auto'>
                    <div className='flex items-center gap-2'>
                        <h1 className='text-2xl font-bold sr-only'>sc-flow</h1>
                        <SidebarTrigger />
                        <Breadcrumbs />
                    </div>
                    <div className='gap-1 flex items-center'>
                        <ModeToggle />
                    </div>
                </header>
                <Separator />
                <div className='flex-1 overflow-auto'>
                    <div className="flex-1 container py-4 text-accent-foreground">
                        {children}
                    </div>
                </div>
            </div>
        </main>

    )
}

export default layout