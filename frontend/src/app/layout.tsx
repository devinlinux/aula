import type { Metadata } from "next";
import Provider from "./provider"
import MainWrapper from "./main-wrapper"
import "./globals.css"

export const metadata: Metadata = {
  title: "Aula",
  description: "Prototype study coordination app for university students",
};

export default function RootLayer(props: { children: React.ReactNode }) {
    const { children } = props

    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>
                    <MainWrapper>{children}</MainWrapper>
                </Provider>
            </body>
        </html>
    )
}
