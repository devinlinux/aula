"use client"

import {
    Container,
    Box,
    VStack,
    Field,
    Input,
    InputGroup,
    FileUpload,
    Button,
    CloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaUpload } from "react-icons/fa"
import { FiFileMinus } from "react-icons/fi"
import { Toaster, toaster } from "@/components/ui/toaster"

const CreateGroup = ({ refreshGroups, defaults = {}, defaultBanner = null }) => {
    const baseGroup = {
        name: "",
        associatedClass: "",
        times: "",
        creator: typeof window !== "undefined" ? localStorage.getItem("email") : "",
    }

    const [group, setGroup] = useState({ ...baseGroup, ...defaults })

    const [bannerImage, setBannerImage] = useState(defaultBanner)

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

        const responseData = await createResponse.json()
        formData.append("id", responseData.id)
        formData.append("file", bannerImage)

        try {
            const uploadResponse = await fetch("http://localhost:8080/api/groups/upload-banner-image", {
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

        refreshGroups()
    }


    return (
        <Container>
            <Toaster />

            <Box color="whiteAlpha.900">
                <VStack>
                    <Field.Root required>
                        <Field.Label>
                            Name <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            value={group.name}
                            placeholder="St. Thomas' Study Group"
                            borderColor="white"
                            onChange={(e) =>
                                setGroup({ ...group, name: e.target.value })
                            }
                        />
                    </Field.Root>
                    <Field.Root required>
                        <Field.Label>
                            Class <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            value={group.associatedClass}
                            placeholder="THL1000"
                            borderColor="white"
                            onChange={(e) =>
                                setGroup({ ...group, associatedClass: e.target.value })
                            }
                        />
                    </Field.Root>
                    <Field.Root required>
                        <Field.Label>
                            Meeting Times <Field.RequiredIndicator />
                        </Field.Label>
                        <Input
                            value={group.times}
                            placeholder="MWF 9-10 PM"
                            borderColor="white"
                            onChange={(e) =>
                                setGroup({ ...group, times: e.target.value })
                            }
                        />
                    </Field.Root>
                    <FileUpload.Root
                        required
                        maxFiles={1}
                        accept="image/*"
                        onFileChange={(e) => setBannerImage(e.acceptedFiles[0] ?? null)}
                    >
                        <FileUpload.HiddenInput />
                        <FileUpload.Label>Upload Banner Image</FileUpload.Label>
                        <InputGroup
                            startElement={<FiFileMinus />}
                            endElement={
                                <FileUpload.ClearTrigger asChild>
                                    <CloseButton
                                        me="-1"
                                        size="xs"
                                        variant="plain"
                                        focusVisibleRing="inside"
                                        focusRingWidth="2px"
                                        pointerEvents="auto"
                                    />
                                </FileUpload.ClearTrigger>
                            }
                        >
                            <Input asChild>
                                <FileUpload.Trigger>
                                    <FileUpload.FileText lineClamp={1} />
                                </FileUpload.Trigger>
                            </Input>
                        </InputGroup>
                    </FileUpload.Root>
                    <Button onClick={submitAll}>
                        Create
                    </Button>
                </VStack>
            </Box>
        </Container>
    )
}

export default CreateGroup
