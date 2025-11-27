"use client"

import {
    Box,
    Container,
} from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Navbar from "@/components/ui/navbar"

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <Box as="main" pb={8}>
            <Navbar path={pathname} />

            {children}
        </Box>
    )
}
