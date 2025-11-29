"use client"

import {
    Container,
    Box,
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
        creator: "",
    })

    return (
        <Container>
            <Toaster />
        </Container>
    )
}

export default CreateGroup
