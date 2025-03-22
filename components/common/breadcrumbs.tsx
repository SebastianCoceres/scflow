"use client"
import { usePathname } from "next/navigation";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { Home } from "lucide-react";
import { Fragment } from "react";


function Breadcrumbs() {
    const pathname = usePathname();
    const paths = pathname === "/" ? [""] : pathname.split("/");
    return (
        <div className="flex items-center flex-start">

            <Breadcrumb>
                <BreadcrumbList>
                    {paths.map((path, index) => (
                        <Fragment key={index}>
                            {path !== "" && <BreadcrumbSeparator />}
                            <BreadcrumbItem >
                                <BreadcrumbLink className="capitalize text-foreground" href={`/${paths.slice(0, index + 1).join("/")}`}>
                                    {
                                        path === ""
                                            ? <Home size={16} />
                                            : path
                                    }	</BreadcrumbLink>
                            </BreadcrumbItem>
                        </Fragment>
                    ))}
                </BreadcrumbList>
            </Breadcrumb>
        </div >

    )
}

export default Breadcrumbs