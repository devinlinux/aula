"use client"

import {
    Box,
    Flex,
    Text,
} from "@chakra-ui/react"

const Navbar = () => {
    return (
        <Flex
            as="nav"
            position="fixed"
            top="2%"
            left="3%"
            right="3%"
            bg="whiteAlpha.900"
            boxShadow="md"
            zIndex="1000"
            px="1rem"
            py="2rem"
            align="center"
            justify="space-between"
        >
            <Text fontWeight="bold" fontSize="xl">
                NAME
            </Text>

            <Flex gap={8}>
                <Text cursor="pointer">Find</Text>
                <Text cursor="pointer">Groups</Text>
                <Text cursor="pointer">Forum</Text>
            </Flex>
        </Flex>
    )
}

export default Navbar
