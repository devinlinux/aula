"use client"

import {
    Box,
    Flex,
    Stack,
    Heading,
    Text,
    Link,
    Center,
    Menu,
    MenuItem,
    MenuList,
    MenuButton,
    IconButton,
} from "@chakra-ui/react"
import { HamburgerIcon } from "@chakra-ui/icons"
import React from "react"
import NextLink from "next/link"
import Logo from "@/components/ui/logo"
import Profile from "@/components/ui/profile"

const LinkItem = React.forwardRef(({ href, path, target, children, ...props }, ref) => {
    const active = path === href

    return (
        <Link
            as={NextLink}
            href={href}
            p={2}
            color={active ? "#f0e7db" : "whiteAlpha.900"}
            target={target}
            ref={ref}
            {...props}
        >
            {children}
        </Link>
    )
})

const Navbar = ({ path, ...props }) => {
    return (
        <Box
            position="fixed"
            as="nav"
            w="70%"
            bg="#20202399"
            zIndex={3}
            top={2}
            pt={1}
            pb={1}
            left="15%"
            right="15%"
            borderRadius={5}
            {...props}
        >
            <Flex align="center" justify="space-between" pl={5} pr={5}>
                <Heading as="h1" size="lg" letterSpacing="tighter">
                    <Logo />
                </Heading>

                <Stack
                    direction="row"
                    spacing={4}
                    display={{ base: "none", md: "flex" }}
                >
                    <LinkItem href="/login" path={path}>Login</LinkItem>
                    <LinkItem href="/register" path={path}>Register</LinkItem>
                    <LinkItem href="/groups" path={path}>Groups</LinkItem>
                    <LinkItem href="/forum" path={path}>Forum</LinkItem>
                </Stack>

                <Heading as="h1" size="lg" letterSpacing="tighter">
                    <Profile />
                </Heading>
            </Flex>
        </Box>
    )
}

export default Navbar
