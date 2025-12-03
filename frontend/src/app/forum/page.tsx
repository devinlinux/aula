"use client"

import {
    Container,
    Box,
    Flex,
    VStack,
    Center,
    Dialog,
    Portal,
    Button,
    ButtonGroup,
    CloseButton,
    Text,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"
import { Toaster, toaster } from "@/components/ui/toaster"
import ForumItem from "@/components/ui/forum-item"
import CreatePost from "@/components/ui/create-post"

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
            setPosts(json.content)
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
        <Container maxW="container.lg" pt={20}>
            <Toaster />

            <Flex align="center" justifyContent="space-between" p={2} color="white" bgColor="#202023" borderRadius={12} mb={7}>

                <Box pl={5}>
                    <Text fontWeight="bold" fontSize="lg">AULA FORUM</Text>
                </Box>

                <Box pr={5}>
                    <Dialog.Root>
                        <Dialog.Trigger asChild>
                            <Button borderRadius={6}>Create Post</Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content bgColor="#202023" color="whiteAlpha.900">
                                    <Dialog.Header>
                                        Create Post
                                    </Dialog.Header>

                                    <Dialog.Body>
                                        <CreatePost refreshFn={() => getAllPosts(currentPage)} />
                                    </Dialog.Body>

                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" color="white" _hover={{ bg: "none" }} />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>
                </Box>

            </Flex>

            {posts.map((p) => (
                <ForumItem
                    key={p.id}
                    id={p.id}
                    title={p.title}
                    associatedClass={p.associatedClass}
                    contents={p.contents}
                    poster={p.poster}
                />
            ))}

            <Center pb={3}>
                <ButtonGroup>
                    <Button
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        isDisabled={currentPage === 0}
                    >
                        <FaCaretLeft />
                    </Button>
                    <Button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        isDisabled={posts.length === 0}
                    >
                        <FaCaretRight />
                    </Button>
                </ButtonGroup>
            </Center>
        </Container>
    )
}

export default Forum
