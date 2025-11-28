import type { Metadata } from "next";
import Provider from "./provider"
import MainWrapper from "./main-wrapper"

export const metadata: Metadata = {
  title: "INSERT_TITLE_HERE",
  description: "INSERT_DESCRIPTION_HERE",
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
