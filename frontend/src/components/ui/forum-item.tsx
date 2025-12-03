"use client"

import {
    Box,
    Image,
    LinkBox,
    LinkOverlay,
    Dialog,
    Portal,
    Button,
    CloseButton,
    Heading,
    Text,
} from "@chakra-ui/react"
import NextLink from "next/link"

const ForumItem = ({ id, title, associatedClass, contents, poster }) => {
    return (
        <Box
            h="60"
            m={4}
            color="white"
            display="flex"
            flexDirection="row"
            justifyContent="flex-start"
            alignItems="flex-start"
            bgColor="#20202399"
            borderRadius={12}
        >
            <LinkBox
                as={NextLink}
                href={`/forum/${id}`}
                scroll={false}
                cursor="pointer"
            >
                <Box p={4}>
                    <Box>
                        <Heading as="h1">{title} | {associatedClass}</Heading>
                    </Box>
                    <Box>
                        <Text fontSize="lg">{poster}</Text>
                    </Box>
                    <Box>
                        <Text fontSize="sm">
                            {contents.length > 250 ? contents.substring(0, 250) + "..." : contents.substring(0, 250)}
                        </Text>
                    </Box>
                </Box>
            </LinkBox>
        </Box>
    )
}

export default ForumItem
