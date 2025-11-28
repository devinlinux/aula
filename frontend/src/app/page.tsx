"use client"

import {
    Container,
    Box,
    Flex,
    Center,
    Tabs,
    Heading,
} from "@chakra-ui/react"
import { FaUserPlus, FaUserGraduate } from "react-icons/fa"
import Banner from "@/components/ui/banner"
import Clock from "@/components/ui/clock"
import Register from "@/components/ui/register"

const Index = () => {
    return (
        <Container>
            <Box
                position="fixed"
                as="nav"
                w="70%"
                bg="#000000"
                zIndex={3}
                top={2}
                pt={3}
                left="15%"
                right="15%"
                borderRadius={5}
            >
                <Flex align="center" justify="space-between" pl={5} pr={5}>
                    <Heading as="h1" size="lg" color="whiteAlpha.900">
                        AULA
                    </Heading>

                    <Heading as="h1" size="lg" color="whiteAlpha.900">
                        <Clock />
                    </Heading>
                </Flex>
            </Box>
            <Container maxW="container.lg" pt={14}>
                <Banner />
            </Container>

            <Container maxW="container.lg">
                <Container maxW="container.md">
                    <Tabs.Root defaultValue="register" colorPalette="blue" fitted>
                        <Tabs.List>
                            <Tabs.Trigger value="register" color="whiteAlpha.900">
                                <FaUserPlus /> Register
                            </Tabs.Trigger>
                            <Tabs.Trigger value="login" color="whiteAlpha.900">
                                <FaUserGraduate /> Login
                            </Tabs.Trigger>
                        </Tabs.List>

                        <Tabs.Content value="register">
                            <Box>
                            </Box>
                        </Tabs.Content>
                        <Tabs.Content value="register">
                            <Register />
                        </Tabs.Content>
                    </Tabs.Root>
                </Container>
            </Container>
        </Container>
    )
}

export default Index;
