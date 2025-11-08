import type { Metadata } from "next";
import Provider from "./provider"

export const metadata: Metadata = {
  title: "INSERT_TITLE_HERE",
  description: "INSERT_DESCRIPTION_HERE",
};

export default function RootLayer(props: { children: React.ReactNode }) {
    const { children } = props
    return (
        <html lang="en" suppressHydrationWarning>
            <body>
                <Provider>{children}</Provider>
            </body>
        </html>
    )
}
