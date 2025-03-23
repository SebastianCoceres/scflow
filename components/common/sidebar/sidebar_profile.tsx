"use client"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";
export default function SidebarProfile() {
    const user = useCurrentUser();
    console.log(user)
    return (
        <>
            <Avatar className="w-8 h-8">
                <AvatarImage src={user?.image || ""} alt="" />
                <AvatarFallback className="text-muted-foreground">{user?.name?.charAt(0)}</AvatarFallback>
            </Avatar> {user?.name}{user?.lastname}
        </>
    )
}