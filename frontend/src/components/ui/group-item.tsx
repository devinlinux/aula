"use client"

import {
    Box,
    Image,
    LinkBox,
    LinkOverlay,
    Text,
} from "@chakra-ui/react"
import NextLink from "next/link"

const GroupItem = ({ id, name, associatedClass, times, bannerImage }) => {
    <Box w="100%" textAlign="center">
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
                />
            </Box>
            <LinkOverlay as="div" href={`/groups/${id}`}>
                <Text mt={2} fontSize={20}>
                    {name}
                </Text>
            </LinkOverlay>
        </LinkBox>
    </Box>
}

export default GroupItem
