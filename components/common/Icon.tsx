import { cn } from "@/lib/utils"
import { Waypoints } from "lucide-react"
import Link from "next/link"
import { useSidebar } from "@/components/ui/sidebar"


function Logo({ fontSize = "text-2xl", iconSize }: { fontSize?: string, iconSize: number }) {
    const { open, isMobile } = useSidebar()
    return (
        <Link href="/" className={cn("text-2xl font-bold flex items-center gap-2", fontSize)}>
            <div className="rounded-xl bg-gradient-to-r from-primary-600 to-primary-400 p-2">
                <Waypoints size={iconSize} className="stroke-white" />
            </div>
            {(open || isMobile) && <div>
                <span className="bg-gradient-to-r from-primary-600 to-primary-400 bg-clip-text text-transparent">SC</span>
                <span className="bg-gradient-to-r from-neutral-600 to-neutral-400 bg-clip-text text-transparent">Flow</span>
            </div>
}

        </Link >
    )
}

export default Logo