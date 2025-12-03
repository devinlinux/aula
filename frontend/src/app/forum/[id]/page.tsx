import {
    Container,
    Box,
    Flex,
    Center,
    Heading,
    Text,
} from "@chakra-ui/react"
import { notFound } from "next/navigation"
import Banner from "@/components/ui/banner"

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
        </Container>
    )
}
