"use client"

import Link from "next/link"
import { Text, Image } from "@chakra-ui/react"
import styled from "@emotion/styled"
import React, { useEffect, useState } from "react"

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

const Profile = () => {
    const [imageSrc, setImageSrc] = useState<string>("")

    const email =
        typeof window !== "undefined" ? localStorage.getItem("email") : null

    useEffect(() => {
        if (!email) return

        const fetchProfilePicture = async () => {
            try {
                const res = await fetch(`http://localhost:8080/api/users/profile-picture/${email}`)
                if (!res.ok) throw new Error("failed to fetch profile picture")

                const blob = await res.blob()
                const url = URL.createObjectURL(blob)
                setImageSrc(url)
            } catch (err) {
                return "/images/default_profile.jpg"
            }
        }

        fetchProfilePicture()
    }, [email])

    return (
        <Link href="/profile">
            <LogoBox>
                <Text
                    color="whiteAlpha.900"
                    fontFamily="M PLUS Rounded 1c, sans-serif"
                    fontWeight="bold"
                    mr={3}
                >
                    Profile &nbsp;
                </Text>

                {imageSrc ? (
                    <Image
                        src={imageSrc}
                        width={30}
                        height={30}
                        alt="profile picture"
                        borderRadius="full"
                    />
                ) : (
                    <Image
                        src="/images/default_profile.jpg"
                        width={30}
                        height={30}
                        alt="default profile"
                        borderRadius="full"
                    />
                )}
            </LogoBox>
        </Link>
    )
}

export default Profile
