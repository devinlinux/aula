"use client"

import React, {
    forwardRef,
    useMemo,
    useRef,
    useLayoutEffect,
} from "react"
import {
    Canvas,
    useFrame,
    useThree,
    RootState,
} from "@react-three/fiber"
import {
    Color,
    Mesh,
    ShaderMaterial,
} from "three"
import { IUniform } from "three"

type RGB = [ number, number, number ]

const hexToRGB = (hex: string): RGB => {
    const clean = hex.replace('#', '')
    const r = parseInt(clean.slice(0, 2), 16) / 255
    const g = parseInt(clean.slice(2, 4), 16) / 255
    const b = parseInt(clean.slice(4, 6), 16) / 255
    return [r, g, b]
}

interface UniformValue<T = number | Color> {
    value: T
}
