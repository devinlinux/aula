import {
    Container,
    Box,
    Flex,
    Center,
    Dialog,
    Portal,
    Button,
    CloseButton,
    Heading,
    Text,
} from "@chakra-ui/react"
import { notFound } from "next/navigation"
import { FaPenFancy } from "react-icons/fa"
import Banner from "@/components/ui/banner"
import CreateResponse from "@/components/ui/create-response"

export default async function PostPage({ params }) {
    const { id } = await params

    const res = await fetch (`http://localhost:8080/api/forum/post/${id}`, {
        cache: "no-store"
    })

    if (!res.ok) return notFound()

    const post = await res.json()
    console.log(post)

    return (
        <Container maxW="container.md" pt={20}>
            <Banner text="AULA" />

            <Box p={3} borderWidth="1px" borderColor="#ffffff40" borderRadius={6}>
                <Box color="white" pt={5}>
                    <Heading 
                        as="h1"
                        fontSize="36px"
                        textDecoration="underline"
                    >
                        {post.title}
                    </Heading>
                    <Text fontSize="sm" pt={2}>{post.poster}</Text>
                </Box>
                <Box color="white">
                    <Text pt={2}>{post.contents}</Text>
                </Box>
            </Box>

            <Flex justifyContent="flex-end" color="white" p={2} m={2}>
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button size="lg" color="white">
                            <FaPenFancy />
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content bgColor="#202023" color="whiteAlpha.900">
                                <Dialog.Header>
                                    <Dialog.Title>Write Response</Dialog.Title>
                                </Dialog.Header>

                                <Dialog.Body>
                                    <CreateResponse id={post.id}/>
                                </Dialog.Body>

                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" color="white" _hover={{ bg: "none" }} />
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Flex>

            {post.responses.map((r, i) => (
                <Box key={i} color="white" borderWidth="1px" borderColor="#ffffff40" borderRadius={6} p={3} m={2}>
                    <Text>{r.contents}</Text>
                    <Text> - {r.posterName}</Text>
                </Box>
            ))}
        </Container>
    )
}
