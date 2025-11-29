"use client"

import {
    Container,
    Box,
    Center,
    SimpleGrid,
    Button,
} from "@chakra-ui/react"
import { useState } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"

const Groups = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [data, setData] = useState({})

    const getAllGroups = async (page, size) => {
        try {
            const { res } = await fetch(`http://localhost:8080/api/groups/get-all-groups?page=${page}&size=${size}`)
            setData(res)
            console.log(data)
        } catch (err) {
            toaster.create({
                type: "error",
                description: err.message,
                duration: 2000,
            })
        }
    }

    return (
        <Container maxW="container.lg" pt={20}>
            <Toaster />

            <SimpleGrid columns={3}>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            <Button onClick={() => getAllGroups(currentPage, 10)}>
                PRESS ME
            </Button>
            </SimpleGrid>
        </Container>
    )
}

export default Groups
