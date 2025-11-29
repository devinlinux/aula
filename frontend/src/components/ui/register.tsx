"use client"

import {
    Container,
    Box,
    Center,
    VStack,
    Steps,
    ButtonGroup,
    Button,
    CloseButton,
    Text,
    Field,
    Input,
    InputGroup,
    FileUpload,
    useSteps,
} from "@chakra-ui/react"
import { useState } from "react"
import { FaUpload } from "react-icons/fa"
import { FiFileMinus } from "react-icons/fi"
import { Toaster, toaster } from "@/components/ui/toaster"
import { PasswordInput } from "@/components/ui/password-input"

const Register = () => {
    const steps = [ "Name", "Login Info", "School Info", "Profile Picture" ]
    const step = useSteps({
        defaultStep: 0,
        count: steps.length,
    })
    const [registration, setRegistration] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        graduationYear: "",
    })

    const [profilePicture, setProfilePicture] = useState<File | null>(null)

    const submitAtEnd = () => {
        if (step.value === steps.length - 1)  {
            console.log("ATTEMPTING SUBMIT")
            submitAll()
        }
    }

    const submitAll = async () => {
        console.log("SUBMIT ALL")

        const registerPayload = {
            ...registration,
            graduationYear: Number(registration.graduationYear),
        }

        let registerResponse

        try {
            registerResponse = await fetch ("http://localhost:8080/api/users/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(registerPayload),
            })

            if (!registerResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Registration failed, please try again",
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
        formData.append("email", registration.email)
        formData.append("file", profilePicture)

        try {
            const uploadResponse = await fetch(
                "http://localhost:8080/api/users/upload-profile-picture",
                {
                    method: "POST",
                    body: formData,
                }
            )

            if (!uploadResponse.ok) {
                toaster.create({
                    type: "error",
                    description: "Failed to upload profile picture",
                    duration: 2000,
                })
            }
        } catch (err) {
            toaster.create({
                type: "error",
                description: "Failed to upload profile picture",
                duration: 2000,
            })
        }

        toaster.create({
            type: "success",
            description: "Registration complete!",
            duration: 2000,
        })
    }

    return (
        <Container>
            <Toaster />
            <Steps.RootProvider value={step} count={steps.length}>
                <Steps.List>
                    {steps.map((step, index) => (
                        <Steps.Item key={index} index={index} title={step}>
                            <Steps.Indicator color="whiteAlpha.900" bgColor="#202023" borderColor="#ffffff"/>
                            <Steps.Title color="whiteAlpha.900">{step}</Steps.Title>
                            <Steps.Separator />
                        </Steps.Item>
                    ))}
                </Steps.List>

                <Center>

                    <Steps.Content key={0} index={0}>
                        <Box color="whiteAlpha.900">
                            <VStack>
                                <Field.Root required>
                                    <Field.Label>
                                        First Name <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Michael"
                                        borderColor="white"
                                        onChange={(e) =>
                                            setRegistration({ ...registration, firstName: e.target.value })
                                        }
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Last Name <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Bobrowski"
                                        borderColor="white"
                                        onChange={(e) =>
                                            setRegistration({ ...registration, lastName: e.target.value })
                                        }
                                    />
                                </Field.Root>
                            </VStack>
                        </Box>
                    </Steps.Content>

                    <Steps.Content key={1} index={1}>
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
                                            setRegistration({ ...registration, email: e.target.value })
                                        }
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput
                                        placeholder="Enter your password"
                                        onChange={(e) =>
                                            setRegistration({ ...registration, password: e.target.value })
                                        }
                                    />
                                </Field.Root>
                            </VStack>
                        </Box>
                    </Steps.Content>

                    <Steps.Content key={2} index={2}>
                        <Box color="whiteAlpha.900">
                            <VStack>
                                <Field.Root required>
                                    <Field.Label>
                                        Major <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Computer Engineering"
                                        borderColor="white"
                                        onChange={(e) =>
                                            setRegistration({ ...registration, major: e.target.value })
                                        }
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Graduation Year <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="2029"
                                        borderColor="white"
                                        onChange={(e) =>
                                            setRegistration({ ...registration, graduationYear: e.target.value })
                                        }
                                    />
                                </Field.Root>
                            </VStack>
                        </Box>
                    </Steps.Content>

                    <Steps.Content key={3} index={3}>
                        <Box color="whiteAlpha.900">
                            <VStack>
                                <FileUpload.Root
                                    required maxFiles={1}
                                    accept="image/*"
                                    onFileChange={(e) => setProfilePicture(e.acceptedFiles[0] ?? null)}
                                >
                                    <FileUpload.HiddenInput />
                                    <FileUpload.Label>Upload Profile Picture</FileUpload.Label>
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
                            </VStack>
                        </Box>
                    </Steps.Content>

                    <Steps.CompletedContent>
                        <Text color="whiteAlpha.900">Registering...</Text>
                    </Steps.CompletedContent>

                </Center>

                <Center>
                    <ButtonGroup size="sm" varient="outline" colorPalette="gray">
                        <Steps.PrevTrigger asChild>
                            <Button>Prev</Button>
                        </Steps.PrevTrigger>
                        <Steps.NextTrigger asChild>
                            <Button onClick={submitAtEnd}>
                                {step.value === steps.length - 1 ? "Submit" : "Next"}
                            </Button>
                        </Steps.NextTrigger>
                    </ButtonGroup>
                </Center>
            </Steps.RootProvider>
        </Container>
    )
}

export default Register
