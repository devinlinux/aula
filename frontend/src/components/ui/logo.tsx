import Link from "next/link"
import Image from "next/image"
import { Text } from "@chakra-ui/react"
import styled from "@emotion/styled"

const LogoBox = styled.span`
    font-weight: bold;
    font-size: 18px;
    display: inline-flex;
    align-items: center;
    height: 30px;
    line-height: 20px;
    padding: 10px;

    &:hover img {
        transform: rotate(360deg);
        transition: 500ms ease;
    }
`

const Logo = () => {
    const img = "/images/logo_placeholder.png"

    return (
        <Link href="/">
            <LogoBox>
                <Image src={img} width={30} height={30} alt="logo" />
                <Text
                    color="whiteAlpha.900"
                    fontFamily='M PLUS Rounded 1c, sans-serif'
                    fontWeight="bold"
                    ml={3}
                >
                    &nbsp;Aula
                </Text>
            </LogoBox>
        </Link>
    )
}

export default Logo
