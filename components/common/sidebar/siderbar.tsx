"use client"

import { routes } from "@/app/routes"
import Logo from "@/components/common/Icon"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator, useSidebar } from "@/components/ui/sidebar"
import { useGetActiveRoute } from "@/lib/routes-utils"
import { ChevronUp, LogOut, LucideProps, User2Icon } from "lucide-react"
import { SessionProvider } from "next-auth/react"
import Link from "next/link"
import SidebarProfile from "./sidebar_profile"
import React from "react"

const sidebar_content = [
    {
        type: "group",
        label: "Menu",
        links: routes.filter((route: { disabled: boolean }) => !route.disabled).map((route: { href: string, icon: React.ComponentType<LucideProps>, label: string }) => ({
            href: route.href,
            icon: route.icon,
            label: route.label,
        })),
    }
]

const sidebar_footer = [
    {
        href: "/profile",
        icon: User2Icon,
        label: "Perfil",
    },
    {
        href: "/api/auth/signout",
        icon: LogOut,
        label: "Cerrar sesión",
    },
]



export function DesktopSidebar() {

    const activeRoute = useGetActiveRoute();
    const { open, isMobile } = useSidebar();

    return (
        <>
            <Sidebar collapsible={isMobile ? "offcanvas" : "icon"}>
                <SidebarHeader>
                    <div className="flex items-center justify-center gap-2 p-4">
                        <Logo fontSize="text-4xl" iconSize={!open ? 16 : 24} />
                    </div>
                </SidebarHeader>
                <SidebarSeparator />
                <SidebarContent>
                    {sidebar_content.map((group) => (
                        <SidebarGroup key={group.label}>
                            <SidebarGroupLabel>{group.label}</SidebarGroupLabel>
                            <SidebarGroupContent>
                                <SidebarMenu>
                                    {group.links.map((link) => (
                                        <SidebarMenuItem key={link.href}>

                                            <SidebarMenuButton asChild isActive={link.href === activeRoute?.href}>
                                                <Link href={link.href}>
                                                    <link.icon size={20} />
                                                    {link.label}
                                                </Link>
                                            </SidebarMenuButton>
                                        </SidebarMenuItem>
                                    ))}
                                </SidebarMenu>
                            </SidebarGroupContent>
                        </SidebarGroup>
                    ))}

                </SidebarContent>
                <SidebarFooter>
                    <SidebarMenu>
                        <SidebarSeparator />
                        <SidebarMenuItem>
                            <DropdownMenu >
                                <DropdownMenuTrigger asChild>
                                    <SidebarMenuButton size={"lg"}>
                                        <SessionProvider>
                                            <SidebarProfile />
                                        </SessionProvider>
                                        <ChevronUp className="ml-auto" />
                                    </SidebarMenuButton>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent
                                    side="top"
                                    collisionPadding={8}
                                    className={`p-0 ${open ? "w-[--radix-popper-anchor-width]" : ""}`}
                                >
                                    {sidebar_footer.map((group) => (
                                        <DropdownMenuItem key={group.href}>
                                            <Button asChild variant="ghost" size={"sm"} className="justify-start">
                                                <Link href={group.href} className="w-full">
                                                    <group.icon size={20} />
                                                    {group.label}
                                                </Link>
                                            </Button>
                                        </DropdownMenuItem>
                                    ))}
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </SidebarMenuItem>
                    </SidebarMenu>
                </SidebarFooter>
            </Sidebar>
        </>
    )
}

export default DesktopSidebar

