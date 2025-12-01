"use client"

import { Button, Text } from "@chakra-ui/react"
import { Toaster, toaster } from "@/components/ui/toaster"

const JoinGroupButton = ({ id }) => {
    const joinGroup = async () => {
        const email = typeof window !== "undefined" ? localStorage.getItem("email") : ""
        const request = JSON.stringify({
            id: id,
            email: email,
        })

        try {
            joinResponse = await fetch("http://localhost:8080/api/groups/add-member", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: request,
            })

            if (!joinResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Failed to join group, please try again later",
                    duration: 2000,
                })
            }
            return
        } catch (err) {
            toaster.create({
                type: "error",
                description: "Unable to connect to the server",
                duration: 2000,
            })
            return
        }

        toaster.create({
            type: "success",
            description: "Joined group!",
            duration: 2000,
        })

        window.location.reload()
    }

    return (
        <Button onClick={joinGroup}>
            <Text fontWeight="bold">Join Group</Text>
        </Button>
    )
}

export default JoinGroupButton
