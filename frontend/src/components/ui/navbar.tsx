"use client"

import {
    Container,
    Box,
    Stack,
    Heading,
    Flex,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
    Link,
    chakra,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import React from "react"
import NextLink from "next/link"

const LinkItem = React.forwardRef(({ href, path, target, children, ...props }, ref) => {
    const active = path === href

    return (
        <Link
            as={NextLink}
            href={href}
            p={2}
            bg={active ? "#88ccca" : undefined}
            color={active ? "#202023" : "gray200"}
            target={target}
            ref={ref}
            {...props}
         >
            {children}
         </Link>
    )
})

const Navbar = props => {
    const { path } = props

    return (
        <Box
            position="fixed"
            as="nav"
            w="100%"
            bg="#20202380"
            css={{ backdropFilter: "blur(10px)" }}
            zIndex={3}
            {...props}
        >
            <Container
                display="flex"
                p={2}
                maxW="container.md"
                wrap="wrap"
                align="center"
                justify="space-between"
            >
                <Flex align="center" mr={5}>
                    <Heading as="h1" size="lg" letterSpacing={"tighter"}>
                        Aula
                    </Heading>
                </Flex>

                <Stack
                    direction={{ base: "column", md: "row" }}
                    display={{ base: "none", md: "flex" }}
                    width={{ base: "full", md: "auto" }}
                    alignItems="center"
                    flexGrow={1}
                    mt={{ base: 4, md: 0 }}
                >
                </Stack>
            </Container>
        </Box>
    )
}

export default Navbar
