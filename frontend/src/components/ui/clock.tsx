"use client"

import { useState, useEffect } from "react"
import { Text } from "@chakra-ui/react"

const Clock = () => {
    const [time, setTime] = useState("")

    useEffect(() => {
        const updateClock = () => {
            const now = new Date()
            const hours = now.getHours().toString().padStart(2, "0")
            const minutes = now.getMinutes().toString().padStart(2, "0")
            const seconds = now.getSeconds().toString().padStart(2, "0")
            setTime(`${hours}:${minutes}:${seconds}`)
        }

        updateClock()
        const interval = setInterval(updateClock, 1)
        return () => clearInterval(interval)
    }, [])

    return <Text>{time}</Text>
}

export default Clock
