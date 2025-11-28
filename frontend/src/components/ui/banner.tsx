"use client"

import {
    Box,
    Center,
    Text
} from '@chakra-ui/react'
import Liquid from "@/components/animations/liquid"

const Banner = () => {
    return (
        <Box
            position="relative"
            mb="6"
            pt={30}
            h="80"
            display="flex"
            justifyContent="center"
            alignItems="center"
        >
            <Box position="absolute" w="full" h="full" overflow="hidden" borderRadius="md">
                <Liquid
                    baseColor={[0, 0.1, 1]}
                    speed={0.3}
                    amplitude={0.51}
                    interactive={false}
                />
            </Box>

            <Box zIndex="2" w="full">
                <Center>
                    <Text
                        fontSize="120px"
                        fontWeight="1000"
                        color="#000000"
                        lineHeight="1"
                        textAlign="center"
                        fontFamily="sans-serif"
                        textTransform="uppercase"
                        letterSpacing="16px"
                    >
                        AULA
                    </Text>
                </Center>
            </Box>
        </Box>
    )
}

export default Banner
