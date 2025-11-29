"use client"

import {
    Container,
    Box,
    Field,
    FileUpload,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaUpload } from "react-icons/fa"
import { FiFileMinus } from "react-icons/fi"
import { Toaster, toaster } from "@/components/ui/toaster"

const CreateGroup = () => {
    const [group, setGroup] = useState({
        name: "",
        associatedClass: "",
        times: [""],
        creator: localStorage.getItem("email"),
    })

    const [bannerImage, setBannerImage] = useState<File | null>(null)

    const submitAll = async () => {
        let createResponse

        try {
            createResponse = await fetch("http://localhost:8080/api/groups/create-group", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(group),
            })

            if (!createResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Creating group failed, please try again later",
                    duration: 2000,
                })
                return
            }
        } catch (err) {
            toaster.create({
                type: "error",
                description: "Unable to connect to the server",
                duration: 2000,
            })
            return
        }

        const formData = new FormData()
        formData.append("id", createResponse.json().group.id)
        formData.append("file", bannerImage)

        try {
            const uploadResponse = await fetch("http://localhost:8080/api/gorups/upload-banner-image", {
                method: "POST",
                body: formData,
            })

            if (!uploadResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Failed to upload banner image",
                    duration: 2000,
                })
            }
        } catch (err) {
            toaster.create({
                type: "error",
                description: "Failed to upload banner image",
                duration: 2000,
            })
        }

        toaster.create({
            type: "success",
            description: "Group created!",
            duration: 2000,
        })
    }


    return (
        <Container>
            <Toaster />


        </Container>
    )
}

export default CreateGroup
