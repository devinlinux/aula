"use client"

import { Box } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Silk from "@/components/animations/silk"
import Navbar from "@/components/ui/navbar"

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    return (
        <Box>
        <Box
            position="fixed"
            top={0}
            left={0}
            w="100%"
            h="100%"
            zIndex={-1}
        >
            <Silk
                speed={3}
                scale={1}
                color="0C54C7"
                noiseIntensity={0.5}
                rotation={1.2}
            />
        </Box>
        <Box as="main" pb={8}>
            <Navbar path={pathname} />

            {children}
        </Box>
        </Box>
    )
}
