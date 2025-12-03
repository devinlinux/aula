"use client"

import {
    Container,
    Box,
    VStack,
    Field,
    Input,
    InputGroup,
    Textarea,
    Button,
    CloseButton,
} from "@chakra-ui/react"
import { useState } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"

const CreatePost = ({ refreshFn }) => {

    const placeholderText = `
        Hi all, I'm new to this term and curious what titration actually is. Could someone give a
        short, beginner friendly explanation of the process, what it's used for in chemistry (e.g.
        acid-base titrations), and a simple example? Any tips on common mistakes or things to watch
        out for would be great too. Thanks!
    `.replace(/\s+/g, ' ')

    const [post, setPost] = useState({
        creationTime: 0,
        title: "",
        associatedClass: "",
        contents: "",
        email: typeof window !== "undefined" ? localStorage.getItem("email") : "",
    })

    const submitAll = async () => {
        const currentUnixTime = Math.floor(Date.now() / 1000)
        const postToSend = {
            ...post,
            creationTime: currentUnixTime,
        }

        let createResponse

        try {
            createResponse = await fetch("http://localhost:8080/api/forum/create-post", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(postToSend)
            })

            if (!createResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Creating forum post failed, please try again later",
                    duration: 2000,
                })
                return
            }
        } catch (err) {
            console.log(err)
            toaster.create({
                type: "error",
                description: "Unable to connect to the server",
                duration: 2000,
            })
            return
        }

        toaster.create({
            type: "success",
            description: "Post created!",
            duration: 2000,
        })

        refreshFn()
    }

    return (
        <Container>
            <Toaster />

            <VStack>
                <Field.Root required>
                    <Field.Label>
                        Title <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="What is a Titration?"
                        borderColor="white"
                        onChange={(e) =>
                            setPost({ ...post, title: e.target.value })
                        }
                    />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Class <Field.RequiredIndicator />
                    </Field.Label>
                    <Input
                        placeholder="CHM1151"
                        borderColor="white"
                        onChange={(e) =>
                            setPost({ ...post, associatedClass: e.target.value })
                        }
                    />
                </Field.Root>
                <Field.Root required>
                    <Field.Label>
                        Contents <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                        size="xl"
                        rows={10}
                        placeholder={placeholderText}
                        onChange={(e) =>
                            setPost({ ...post, contents: e.target.value })
                        }
                    />
                </Field.Root>
                <Button onClick={submitAll}>Create Post</Button>
            </VStack>
        </Container>
    )
}

export default CreatePost
