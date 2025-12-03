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
} from "@chakra-ui/react"
import { useState } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"

const CreateResponse = ({ id }) => {
    const [response, setResponse] = useState({
        id: id,
        email: typeof window !== "undefined" ? localStorage.getItem("email") : "",
        contents: "",
    })


    const submitAll = async() => {
        let res

        try {

            console.log(JSON.stringify(response))
            res = await fetch("http://localhost:8080/api/forum/add-response", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(response)
            })

            if (!res.ok) {
                toaster.create({
                    type: "error",
                    description: "Failed to add response, please try again later",
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

        toaster.create({
            type: "success",
            description: "Added response!",
            duration: 2000,
        })

        window.location.reload()
    }

    return (
        <Container>
            <Toaster />

            <Box color="whiteAlpha.900">
                <Field.Root required>
                    <Field.Label>
                        Response <Field.RequiredIndicator />
                    </Field.Label>
                    <Textarea
                        size="xl"
                        rows={5}
                        placeholder="Response..."
                        onChange={(e) =>
                            setResponse({ ...response, contents: e.target.value })
                        }
                    />
                </Field.Root>
                <Button onClick={submitAll}>
                    Post Response
                </Button>
            </Box>
        </Container>
    )
}

export default CreateResponse
