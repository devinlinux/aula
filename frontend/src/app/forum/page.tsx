"use client"

import {
    Container,
    Box,
    Center,
    SimpleGrid,
    Button,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"

const Forum = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [posts, setPosts] = useState([])
    const size = 10

    const getAllPosts = async (page) => {
        try {
            const res = await fetch(`http://localhost:8080/api/forum/get-all-posts?page=${page}&size=${size}`)
            if (!res.ok) {
                 toaster.create({
                     type: "error",
                     description: "Failed to load forum posts",
                     duration: 2000,
                 })
                 return
            }

            const json = await res.json()
            setPosts(json)
        } catch (err) {
            toaster.create({
                type: "error",
                description: err.message,
                duration: 2000,
            })
        }
    }

    useEffect(() => {
        getAllPosts(currentPage)
    }, [currentPage])

    return (
        <Container>
            <Toaster />
        </Container>
    )
}

export default Forum
