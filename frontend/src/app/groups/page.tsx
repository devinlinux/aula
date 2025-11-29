"use client"

import {
    Container,
    Box,
    Center,
    SimpleGrid,
    ButtonGroup,
    Button,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
import { FaCaretLeft, FaCaretRight } from "react-icons/fa"
import { Toaster, toaster } from "@/components/ui/toaster"
import GroupItem, { CreateGroupItem } from "@/components/ui/group-item"

const Groups = () => {
    const [currentPage, setCurrentPage] = useState(0)
    const [groups, setGroups] = useState([])
    const size = 9

    const fetchBannerImage = async (id) => {
        try {
            const res = await fetch(`http://localhost:8080/api/groups/banner-image/${id}`)
            if (!res.ok) throw new Error("failed to fetch banner image")

            const blob = await res.blob()
            return URL.createObjectURL(blob)
        } catch (err) {
            return "/images/create_group.jpg"
        }
    }

    const getAllGroups = async (page) => {
        try {
            const res = await fetch(`http://localhost:8080/api/groups/get-all-groups?page=${page}&size=${size}`)
            if (!res.ok) {
                toaster.create({
                    type: "error",
                    description: "Failed to load groups",
                    duration: 2000,
                })
                return
            }

            const json = await res.json()

            const groupsWithBanners = await Promise.all(
                json.content.map(async (g) => {
                    const img = await fetchBannerImage(g.id)
                    return { ...g, bannerUrl: img }
                })
            )
            setGroups(groupsWithBanners)
        } catch (err) {
            toaster.create({
                type: "error",
                description: err.message,
                duration: 2000,
            })
        }
    }

    useEffect(() => {
        getAllGroups(currentPage)
    }, [currentPage])

    return (
        <Container maxW="container.lg" pt={20}>
            <Toaster />

            <SimpleGrid columns={3}>
                <CreateGroupItem refreshGroups={() => getAllGroups(currentPage)}/>

                {groups.map((g) => (
                    <GroupItem
                        key={g.id}
                        id={g.id}
                        name={g.name}
                        associatedClass={g.associatedClass}
                        times={g.times}
                        bannerImage={g.bannerUrl}
                    />
                ))}
            </SimpleGrid>

            <Center>
                <ButtonGroup>
                    <Button
                        onClick={() => setCurrentPage((p) => Math.max(0, p - 1))}
                        isDisabled={currentPage === 0}
                    >
                        <FaCaretLeft />
                    </Button>

                    <Button
                        onClick={() => setCurrentPage((p) => p + 1)}
                        isDisabled={groups.length === 0}
                    >
                        <FaCaretRight />
                    </Button>
                </ButtonGroup>
            </Center>
        </Container>
    )
}

export default Groups
