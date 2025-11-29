"use client"

import {
    Box,
    Image,
    LinkBox,
    LinkOverlay,
    Dialog,
    Button,
    CloseButton,
    Portal,
    Text,
} from "@chakra-ui/react"
import NextLink from "next/link"
import CreateGroup from "@/components/ui/create-group"

const GroupItem = ({ id, name, associatedClass, times, bannerImage }) => {
    return (
        <Box w="100%" textAlign="center" color="white" p={5}>
            <LinkBox
                as={NextLink}
                href={`/groups/${id}`}
                scroll={false}
                cursor="pointer"
            >
                <Box borderRadius={12}>
                    <Image
                        src={bannerImage}
                        alt={name}
                        placeholder="blur"
                        loading="lazy"
                        borderRadius={12}
                    />
                </Box>
                <LinkOverlay as="div" href={`/groups/${id}`}>
                    <Text mt={2} fontSize={20}>
                        {name}
                    </Text>
                </LinkOverlay>
                <Text fontSize={14} pt={2}>
                    {associatedClass} | {times}
                </Text>
            </LinkBox>
        </Box>
    )
}

export const CreateGroupItem = () => {
    return (
        <Box w="100%" textAlign="center" color="white" p={5}>
            <Box borderRadius={12}>
                <Image
                    src={"/images/create_group.jpg"}
                    alt={"Create Group"}
                    placeholder="blur"
                    loading="lazy"
                    borderRadius={12}
                    pb={2}
                />
                <Dialog.Root>
                    <Dialog.Trigger asChild>
                        <Button>
                            Create Group
                        </Button>
                    </Dialog.Trigger>
                    <Portal>
                        <Dialog.Backdrop />
                        <Dialog.Positioner>
                            <Dialog.Content bgColor="#202023" color="whiteAlpha.900">
                                <Dialog.Header>
                                    <Dialog.Title>Create Group</Dialog.Title>
                                </Dialog.Header>

                                <Dialog.Body>
                                    <CreateGroup />
                                </Dialog.Body>

                                <Dialog.CloseTrigger asChild>
                                    <CloseButton size="sm" color="white" _hover={{ bg: "none" }}/>
                                </Dialog.CloseTrigger>
                            </Dialog.Content>
                        </Dialog.Positioner>
                    </Portal>
                </Dialog.Root>
            </Box>
            <Text fontSize={14} pt={2}>
                Coordinate studying with your friends!
            </Text>
        </Box>
    )
}

export default GroupItem
