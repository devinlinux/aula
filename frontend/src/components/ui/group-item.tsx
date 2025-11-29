"use client"

import {
    Box,
    Image,
    LinkBox,
    LinkOverlay,
    Text,
} from "@chakra-ui/react"
import NextLink from "next/link"
import { Global } from "@emotion/react"

const GroupItem = ({ id, name, associatedClass, times, bannerImage }) => {
    <GroupItemStyle />
    <Box w="100%" textAlign="center">
        <LinkBox
            as={NextLink}
            href={`/groups/${id}`}
            scroll={false}
            cursor="pointer"
        >
            <Image
                src={bannerImage}
                alt={name}
                className="group-item-banner-image"
                placeholder="blur"
                loading="lazy"
            />
            <LinkOverlay as="div" href={`/groups/${id}`}>
                <Text mt={2} fontSize={20}>
                    {name}
                </Text>
            </LinkOverlay>
        </LinkBox>
    </Box>
}

const GroupItemStyle = () => {
    <Global
        style={`
            .group-item-banner-image {
                border-radius: 12px;
            }
        `}
    />
}

export default GroupItem
