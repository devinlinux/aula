import {
    Container,
    Box,
} from "@chakra-ui/react"
import { notFound } from "next/navigation"

export default async function GroupPage({ params }) {
    const { id } = await params
    console.log(id)

    const res = await fetch (`http://localhost:8080/api/groups/group/${id}`, {
        cache: "no-store",
    })

    if (!res.ok) return notFound()

    const group = await res.json()

    return (
        <Container>
            <Box color="white">
                {group.name}
                {group.associatedClass}
                {group.times}
                {group.members}
            </Box>
        </Container>
    )
}
