"use client"

import {
    Container,
    Box,
    Center,
    VStack,
    Button,
    Field,
    Input,
} from "@chakra-ui/react"
import { useState } from "react"
import { Toaster, toaster } from "@/components/ui/toaster"
import { PasswordInput } from "@/components/ui/password-input"

const Login = () => {
    const [login, setLogin] = useState({
        email: "",
        password: "",
    })

    const submitAll = async () => {
        let loginResponse

        try {
            loginResponse = await fetch ("http://localhost:8080/api/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(login)
            })

            if (!loginResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Login failed, please try again",
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
            description: "Login complete!",
            duration: 2000,
        })
    }

    return (
        <Container>
            <Toaster />

            <Center>
                <Box color="whiteAlpha.900">
                    <VStack>
                        <Field.Root required>
                            <Field.Label>
                                Email <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                placeholder="me@example.com"
                                type="email"
                                borderColor="white"
                                onChange={(e) => 
                                    setLogin({ ...login, email: e.target.value })
                                }
                            />
                        </Field.Root>
                        <Field.Root required>
                            <Field.Label>
                                Password <Field.RequiredIndicator />
                            </Field.Label>
                            <Input
                                placeholder="Enter your password"
                                onChange={(e) =>
                                    setLogin({ ...login, password: e.target.value })
                                }
                            />
                        </Field.Root>

                        <Box pt={2}>
                            <Button onClick={submitAll}>
                                Submit
                            </Button>
                        </Box>
                    </VStack>
                </Box>

            </Center>
        </Container>
    )
}

export default Login
