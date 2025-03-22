"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useSession } from "next-auth/react"
export default function SidebarProfile() {
    const { data: session } = useSession();
    
    return (
        <>
            <Avatar className="w-8 h-8">
                <AvatarImage src={session?.user?.image || ""} alt="" />
                <AvatarFallback className="text-muted-foreground">{session?.user?.name?.charAt(0)}</AvatarFallback>
            </Avatar> {session?.user?.name}
        </>
    )
}