"use client"

import {
    Container,
    Box,
    Steps,
    ButtonGroup,
    Button,
} from "@chakra-ui/react"
import { FaUpload } from "react-icons/fa"

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

                <ButtonGroup size="sm" varient="outline" colorPalette="gray">
                    <Steps.PrevTrigger asChild>
                        <Button>Prev</Button>
                    </Steps.PrevTrigger>
                    <Steps.NextTrigger asChild>
                        <Button>Next</Button>
                    </Steps.NextTrigger>
                </ButtonGroup>
            </Steps.Root>
        </Container>
    )
}

export default Register
