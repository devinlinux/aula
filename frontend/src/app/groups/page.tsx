"use client"

import {
    Container,
    Box,
    Center,
    SimpleGrid,
    Button,
} from "@chakra-ui/react"
import { useState, useEffect } from "react"
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
        </Container>
    )
}

export default Groups
