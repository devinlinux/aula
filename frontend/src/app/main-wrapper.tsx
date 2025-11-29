"use client"

import { Box, Flex } from "@chakra-ui/react"
import { usePathname } from "next/navigation"
import Silk from "@/components/animations/silk"
import Navbar from "@/components/ui/navbar"
import Footer from "@/components/ui/footer"

export default function MainWrapper({ children }: { children: React.ReactNode }) {
    const pathname = usePathname()

    const plainRoutes = ['/']
    const plain = plainRoutes.includes(pathname)
    const showSilk = /^\/[^/]+$/.test(pathname)

    return (
        <Box>
            {!plain && showSilk && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    w="100%"
                    h="100%"
                    zIndex={-2}
                >
                    <Silk
                        speed={3}
                        scale={1}
                        color="47a6e6"
                        noiseIntensity={0}
                        rotation={1.2}
                    />
                </Box>
            )}

            <Box as="main" pb={8}>
                {!plain && <Navbar path={pathname} />}

                {children}

                <Box
                    as="footer"
                    position="absolute"
                    textAlign="center"
                    bottom={2}
                    w="100%"
                    zIndex={3}
                >
                    <Footer />
                </Box>
            </Box>
        </Box>
    )
}
