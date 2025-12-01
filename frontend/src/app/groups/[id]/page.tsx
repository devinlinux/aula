import {
    Container,
    Box,
    Flex,
    Center,
    HStack,
    VStack,
    StackSeparator,
    Image,
    Button,
    CloseButton,
    Heading,
    Dialog,
    Portal,
    Text,
} from "@chakra-ui/react"
import { notFound } from "next/navigation"
import { BiSolidEditAlt } from "react-icons/bi"
import Banner from "@/components/ui/banner"
import EditGroup from "@/components/ui/edit-group"

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
            <Flex align="center" justifyContent="space-between" p={2}>
                <Text color="white" pl={5}>
                    {group.members[0]}'s Group
                </Text>
                <Box pr={5}>

                    <Dialog.Root initialFocusEl={null}>
                        <Dialog.Trigger asChild>
                            <Button size="sm" color="white">
                                <BiSolidEditAlt />
                            </Button>
                        </Dialog.Trigger>
                        <Portal>
                            <Dialog.Backdrop />
                            <Dialog.Positioner>
                                <Dialog.Content bgColor="#202023" color="whiteAlpha.900">
                                    <Dialog.Header>
                                        <Dialog.Title>Edit Group</Dialog.Title>
                                    </Dialog.Header>

                                    <Dialog.Body>
                                        <EditGroup 
                                            defaults={{
                                                id: group.id,
                                                name: group.name,
                                                associatedClass: group.associatedClass,
                                                times: group.times,
                                            }}
                                            defaultBanner={`http://localhost:8080/api/banner-image/${id}`}
                                        />
                                    </Dialog.Body>

                                    <Dialog.CloseTrigger asChild>
                                        <CloseButton size="sm" color="white" _hover={{ bg: "none" }} />
                                    </Dialog.CloseTrigger>
                                </Dialog.Content>
                            </Dialog.Positioner>
                        </Portal>
                    </Dialog.Root>


                    {/* TODO: create edit group modal, but auto pop with the info I have here*/}
                    {/* TODO: pass different function for submitting edits */}
                    {/* TODO: forum - basically the same as group page - dynamic population and generation */}
                    {/* TODO: move session management to user service */}
                </Box>
            </Flex>
            <Box color="white">
                <Center>
                    <HStack separator={<StackSeparator />}>
                        <Box pr={2}>
                            <VStack separator={<StackSeparator />} alignItems="flex-start">
                                <Heading as="h1" fontSize="37px" p={1}>{group.name}</Heading>
                                <Heading as="h2" p={1}>{group.associatedClass}</Heading>
                                <Text p={1}>{group.times}</Text>
                                <Text p={1}>{group.members}</Text>
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
