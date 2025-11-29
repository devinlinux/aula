import {
    Container,
    Box,
    Center,
    HStack,
    VStack,
    StackSeparator,
    Image,
    Heading,
    Text,
} from "@chakra-ui/react"
import { notFound } from "next/navigation"
import Banner from "@/components/ui/banner"

export default async function GroupPage({ params }) {
    const { id } = await params

    const res = await fetch (`http://localhost:8080/api/groups/group/${id}`, {
        cache: "no-store",
    })

    if (!res.ok) return notFound()

    const group = await res.json()

    return (
        <Container maxW="container.md" pt={20}>
            <Banner text={group.name} fontSize="70px" letterSpacing="auto"/>
            <Box color="white">
                <Center>
                    <HStack separator={<StackSeparator />}>
                        <Box pr={2}>
                            <VStack separator={<StackSeparator />} alignItems="flex-start">
                                <Heading as="h1" fontSize="37px">{group.name}</Heading>
                                <Heading as="h2">{group.associatedClass}</Heading>
                                <Text>{group.times}</Text>
                                <Text>{group.members}</Text>
                            </VStack>
                        </Box>
                        <Image
                            src={`http://localhost:8080/api/groups/banner-image/${id}`}
                            alt={group.name}
                            placeholder="blur"
                            loading="lazy"
                            borderRadius={12}
                            pl={2}
                        />
                    </HStack>
                </Center>
            </Box>
        </Container>
    )
}
