"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CardWrapperProps {
    children: React.ReactNode
    headerLabel?: string | React.ReactNode
    backButtonLabel?: string | React.ReactNode
    backButtonHref?: string
}


function CardWrapper({ children, headerLabel = "Inicio de sesión" }: CardWrapperProps & { footerChildren?: React.ReactNode }) {
    return (
        <Card className="relative w-full  max-w-[400px] shadow-md dark:shadow-neutral-100/10">
            <CardHeader className={`absolute top-0 left-0 -translate-y-1/2 -translate-x-4 bg-red-600 dark:bg-red-900 text-white rounded-md rounded-bl-3xl rounded-tr-3xl p-4 sm:p-6`}>
                <CardTitle className="flex items-center gap-4">{headerLabel}</CardTitle>
            </CardHeader>
            <CardContent className="p-6 pt-12 aspect-[4/3] flex flex-col justify-center">
                {children}
            </CardContent>
        </Card>
    )
}

export default CardWrapper