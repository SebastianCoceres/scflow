"use client"

import { routes } from "@/app/routes";
import { usePathname } from "next/navigation";

export function useGetActiveRoute() {
    const pathname = usePathname();
    const activeRoute = routes.find((route: { href: string }) => route.href === pathname) || routes[0];
    return activeRoute
}