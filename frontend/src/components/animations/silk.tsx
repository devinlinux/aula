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

interface Value<T = number | Color> {
    value: T
}

interface SilkUniforms {
    speed: Value<number>
    scale: Value<number>
    noiseIntensity: Value<number>
    color: Value<Color>
    rotation: Value<number>
    time: Value<number>
    [uniform: string]: IUniform
}

const vertexShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    void main() {
        vPosition = position;
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
`

const fragmentShader = `
    varying vec2 vUv;
    varying vec3 vPosition;

    uniform float speed;
    uniform float scale;
    uniform float noiseIntensity;
    uniform vec3 color;
    uniform float rotation;
    uniform float time;

    const float e = 2.71828182845904523536;

    float noise(vec2 texCoord) {
        float G = e;
        vec2 r = (G * sin(G * texCoord));
        return fract(r.x * r.y * (1.0 + texCoord.x));
    }

    vec2 rotateUvs(vec2 uv, float angle) {
        float x = cos(angle);
        float y = sin(angle);
        mat2 rot = mat2(x, -y, y, -x);
        return rot * uv;
    }

    void main() {
        float rnd = noise(gl_FragCoord.xy);
        vec2 uv = rotateUvs(vUv * scale, rotation);
        vec2 tex = uv * scale;
        float tOffset = speed * time;

        tex.y + 0.03 * sin(8.0 * tex.x - tOffset);

        float pattern = 0.6 +
            0.4 * sin(5.0 * (tex.x + tex.y +
                             cos(3.0 * tex.x + 5.0 * tex.y) +
                             0.02 * tOffset) +
                             sin(20.0 * (tex.x + tex.y - 0.1 * tOffset)));

        vec4 col = vec4(color, 1.0) * vec4(pattern) - rnd / 15.0 * noiseIntensity;
        col.a = 1.0;
        gl_FragColor = col;
    }
`

interface SilkPlaneProps {
    uniforms: SilkUniforms;
}

const SilkPlane = forwardRef<Mesh, SilkPlaneProps>(function SilkPlane({ uniforms }, ref) {
    const { viewport } = useThree();

    useLayoutEffect(() => {
        const mesh = ref as React.MutableRefObject<Mesh | null>
        if (mesh.current) {
            mesh.current.scale.set(viewport.width, viewport.height, 1);
        }
    }, [ref, viewport]);

    useFrame((_state: RootState, delta: number) => {
        const mesh = ref as React.MutableRefObject<Mesh | null>
        if (mesh.current) {
            const material = mesh.current.material as ShaderMaterial & {
                uniforms: SilkUniforms
            }
            material.uniforms.time.value += 0.1 * delta
        }
    });

    return (
        <mesh ref={ref}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial uniforms={uniforms} vertexShader={vertexShader} fragmentShader={fragmentShader} />
        </mesh>
    )
})

SilkPlane.displayName = "SilkPlane"

export interface SilkProps {
    speed?: number
    scale?: number
    color?: string
    noiseIntensity?: number
    rotation?: number
}

const Silk: React.FC<SilkProps> = ({ speed = 5, scale = 1, color = '#7B7481', noiseIntensity = 1.5, rotation = 0 }) => {
    const meshRef = useRef<Mesh>(null)

    const uniforms = useMemo<SilkUniforms>(
        () => ({
            speed: { value: speed },
            scale: { value: scale },
            noiseIntensity: { value: noiseIntensity },
            color: { value: new Color(...hexToRGB(color)) },
            rotation: { value: rotation },
            time: { value: 0 }
        }),
        [speed, scale, noiseIntensity, color, rotation]
    )

    return (
        <Canvas dpr={[1, 2]} frameloop="always">
            <SilkPlane ref={meshRef} uniforms={uniforms} />
        </Canvas>
    )
}

export default Silk
