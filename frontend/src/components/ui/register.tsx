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
} from "@chakra-ui/react"
import { FaUpload } from "react-icons/fa"
import { FiFileMinus } from "react-icons/fi"
import { PasswordInput } from "@/components/ui/password-input"

const Register = () => {
    const steps = [ "Name", "Login Info", "School Info", "Profile Picture", "Submit" ]

    return (
        <Container>
            <Steps.Root count={steps.length}>
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
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Last Name <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="Bobrowski"
                                        borderColor="white"
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
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Password <Field.RequiredIndicator />
                                    </Field.Label>
                                    <PasswordInput
                                        placeholder="Enter your password"
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
                                    />
                                </Field.Root>
                                <Field.Root required>
                                    <Field.Label>
                                        Graduation Year <Field.RequiredIndicator />
                                    </Field.Label>
                                    <Input
                                        placeholder="2029"
                                        borderColor="white"
                                    />
                                </Field.Root>
                            </VStack>
                        </Box>
                    </Steps.Content>

                    <Steps.Content key={3} index={3}>
                        <Box color="whiteAlpha.900">
                            <VStack>
                                <FileUpload.Root required maxFiles={1}>
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
                                                <Text color="fg.muted">Select File</Text>
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
                            <Button>Next</Button>
                        </Steps.NextTrigger>
                    </ButtonGroup>
                </Center>
            </Steps.Root>
        </Container>
    )
}

export default Register
